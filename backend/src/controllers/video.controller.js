const { logger } = require('../utils/logger');
// const uploadToCloudinary  = require('../utils/cloudinaryUploader');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_REGION_NAME} = require('../utils/secrets');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const AWS = require('aws-sdk');
const { exec } = require('child_process');


AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_S3_REGION_NAME,
});

const s3 = new AWS.S3();


// write a function that takes a file path and deletes it
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            logger.error(err);
            return;
        }
        logger.info('File deleted successfully');
    }
    );
}

function transcodeToHLS(inputFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
      // Add backslash to escape spaces  in file path
      inputFilePath = inputFilePath.replace(/ /g, '\\ ');

      // Add backslash to escape spaces in outputfile path
      outputFilePath = outputFilePath.replace(/ /g, '\\ ');

      // Execute the ffmpeg command for transcoding to HLS
      const command = `ffmpeg -i ${inputFilePath} -c:v h264 -hls_time 10 -hls_list_size 0 ${outputFilePath}`;
      
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error.message);
        } else {
          console.log(`Transcoding successful: ${stdout}`);
          resolve();
        }
      });
    });
  }
  
  

  function uploadToS3(key, filePath) {

    return new Promise((resolve, reject) => {
      const params = {
        Bucket: 'chessbulb',
        Key: key,
        Body: fs.createReadStream(filePath), // Create a readable stream from the local file
        ContentType: 'application/vnd.apple.mpegurl',
      };
  
      s3.upload(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
  



exports.uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).send('No file provided');
        }
    
        const inputFilePath = req.file.path;
        const outputDirectory = __basedir + "/src/output/";
        const outputFilePath = `${outputDirectory}playlist.m3u8`;
        //create output directory if it doesn't exist
        if (!fs.existsSync(outputDirectory)) {
          fs.mkdirSync(outputDirectory);
        }
    
        await transcodeToHLS(inputFilePath, outputFilePath);
    
        //for each file in the output directory, upload it to S3
        const files = fs.readdirSync(outputDirectory);
        let folderName = Date.now();
        for (const file of files) {
          const filePath = `${outputDirectory}${file}`;
          const key = `videos/${folderName}/${file}`;
          await uploadToS3(key, filePath);
        }



        const key = `videos/${folderName}/playlist.m3u8`;
    
        // await uploadToS3(key, outputFilePath);
    
        const cdnUrl = `https://chessbulb.s3.us-east-1.amazonaws.com/${key}`;
    
        // Clean up: Delete the local file and output directory after transcoding and uploading
        
        fs.unlinkSync(inputFilePath);
        fs.rmdirSync(outputDirectory, { recursive: true });
    
        res.send({ cdnUrl });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}
