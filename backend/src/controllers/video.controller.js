const { logger } = require('../utils/logger');
// const uploadToCloudinary  = require('../utils/cloudinaryUploader');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_REGION_NAME} = require('../utils/secrets');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const AWS = require('aws-sdk');
const { exec } = require('child_process');
const path = require('path'); 
//const stream = require('stream');
//const util = require('util');

//const pipeline = util.promisify(stream.pipeline);


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

function transcodeToHLS(inputFilePath, outputFilePath, outputDirectory, folderName) {
    console.log('Transcoding to HLS...');
    console.log(inputFilePath);
    return new Promise((resolve, reject) => {
      // Add backslash to escape spaces  in file path
      inputFilePath = inputFilePath.replace(/ /g, '\\ ');

      // Add backslash to escape spaces in outputfile path
      outputFilePath = outputFilePath.replace(/ /g, '\\ ');

      // Execute the ffmpeg command for transcoding to HLS
      const command = `ffmpeg -i ${inputFilePath} -c:v h264 -hls_time 10 -hls_list_size 0 ${outputFilePath}`;
      
      exec(command, async (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error.message);
        } else {
          console.log(`Transcoding successful: ${stdout}`);
          // remove backslash from output file path
          inputFilePath = inputFilePath.replace(/\\/g, '');
          fs.unlinkSync(inputFilePath);
          const files = fs.readdirSync(outputDirectory);
      
          for (const file of files) {
            const filePath = `${outputDirectory}${file}`;
            const key = `videos/${folderName}/${file}`;
            await uploadToS3(key, filePath);
            console.log(`Uploaded ${file} to S3`);
          }
          fs.rmdirSync(outputDirectory, { recursive: true });
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
  



exports.uploadVideo = (req, res) => {

  // await uploadToS3(key, outputFilePath);
    // try {
        req.pipe(req.busboy);
        //console.log(req.file);
        var folderName = Date.now();
        var uploadPath = path.join(__basedir, 'fu/'); // Register the upload path
        let outputDirectory = __basedir + "/src/output/";
        if (!fs.existsSync(outputDirectory)) {
          fs.mkdirSync(outputDirectory);
        }
        outputDirectory = __basedir + "/src/output/" + Date.now() + "/";
        if (!fs.existsSync(outputDirectory)) {
          fs.mkdirSync(outputDirectory);
        }
        let outputFilePath = `${outputDirectory}playlist.m3u8`;
        // fs.ensureDir(uploadPath);
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath);
        }
        req.busboy.on('file', (fieldname, file, filename) => {
          console.log(`Upload of 'Video' started`);
          console.log(filename.filename);
          uploadPath = path.join(uploadPath.toString(), filename.filename.toString())
          console.log(uploadPath);
//          console.log(path.join(uploadPath.toString(), filename.filename.toString()));
//          console.log(file)
          // Create a write stream of the new file
          const fstream = fs.createWriteStream(uploadPath);

	  file.on('error', (err) => {
  		console.error('Error during file streaming:', err);
		});
          // Pipe it trough
          file.pipe(fstream);
	console.log("before piping")
//	await pipeline(file, fstream);
//	fstream.end()
	console.log(fstream.writableFinished)
//	while(!fstream.writableFinished){}
          // On finish of the upload
          fstream.on('close', () => {
              console.log(`Upload of '${filename.filename.toString()}' finished`);
      const key = `videos/${folderName}/playlist.m3u8`;
      const cdnUrl = `https://chessbulb.s3.us-east-1.amazonaws.com/${key}`;
      res.send({ cdnUrl });
              transcodeToHLS(uploadPath, outputFilePath, outputDirectory, folderName);
          });
	fstream.on('error', (err) => {
	  console.error('Error during file write:', err);
	  // Handle the error as needed
	});
      });
      

      // await transcodeToHLS(uploadPath, outputFilePath);
          
      //for each file in the output directory, upload it to S3


      
      
      

      // } catch (error) {
      //   console.error(error);
      //   res.status(500).send('Internal Server Error');
      // }
}
