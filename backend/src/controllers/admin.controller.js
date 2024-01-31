
exports.createNewAdmin = (req, res) => {
    const {firstName,lastName,email,phoneNumber,adminId,password} = req.body;

    const admin = new Admin(firstName, lastName, email, phoneNumber, adminId, password);

    Admin.create(admin, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data
            });
        }
    });
};

exports.deleteAdmin = (req, res) => {
    const adminId = req.body.adminId;
    Admin.delete(adminId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `admin with id ${adminId} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        res.status(200).send({
            status: 'success',
            message: `admin with id ${adminId} was deleted`
        });
    });
}

exports.updateAdmin = (req, res) => {
    const adminId = req.body.adminId;
    const admin = req.body;
    Admin.update(adminId, admin, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `Admin with id ${adminId} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        res.status(200).send({
            status: 'success',
            message: `Admin with id ${adminId} was updated`
        });
    });
}


exports.adminSignin = (req, res) => {
    const { password } = req.body;
    //check if password is equal to "lambada$123"
    if (password.trim() === "lambada$123") {
        res.status(200).send({
            userId: "YGGBBVu9lINOA0CCZyaqYrvbw3C2",
            name: "Admin",
            email: "adham_mohsen@outlook.com",
            photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8p5zBoVhIU4l2QatLy_HKFgRSObs1PLFb0dndZnyK6E2vgQDmFPfGxhcJ_ZDYPXB0n1E&usqp=CAU",
            hasAcademy: true,
        });
    } else {
        res.status(401).send({
            status: "error",
            message: "Incorrect password"
        });
    }
}