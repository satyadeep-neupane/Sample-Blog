const uuid = require('uuid').v4();

module.exports = (image, folder) => {
    const imageName = image.name;
    const imageExt = imageName.split('.').pop();
    const imagePath = `/uploads/${folder}/${uuid}.${imageExt}`;

    return new Promise((resolve, reject) => {
        image.mv('public'+imagePath, (err) => {
            if(err)
                reject("Error");
            resolve(imagePath);
        })
    });
}
