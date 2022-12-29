/*
 * IN THE NAME OF ALLAH
 * Title: Data handling code
 * Description: It handle all necessary operation to working with file
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/19/2022
 */

const fs = require("fs");
const path = require("path");

const data = {};

// base dir of data folder
data.base_data_dir = path.join(__dirname, "./../.data/");

// write data to file
data.create = (dir, file, given_data, callback) => {
    fs.open(`${data.base_data_dir + dir}/${file}.json`, "wx", (err, file_descriptor) => {
        if (!err && file_descriptor) {
            // convert data to json string
            const string_data = JSON.stringify(given_data);

            // write data to file and close
            fs.writeFile(file_descriptor, string_data, (err2) => {
                if (!err2) {
                    fs.close(file_descriptor, (err3) => {
                        if (!err3) callback(false);
                        else callback(`Error closing the new file! ${err3}`);
                    });
                } else callback(`Error: writing to new file! ${err2}`);
            });
        } else callback(`Could not create file, it may exist ${err}`);
    });
};

// read data from file;
data.read = (dir, file, callback) => {
    fs.readFile(`${data.base_data_dir + dir}/${file}.json`, "utf-8", (err, back_data) => {
        let data_p;
        if (!err) data_p = JSON.parse(back_data);
        callback(err, data_p);
    });
};

// update existing file
data.update = (dir, file, given_data, callback) => {
    // file open for writing
    fs.open(`${data.base_data_dir + dir}/${file}.json`, "r+", (err, file_descriptor) => {
        if (!err && file_descriptor) {
            // convert data to string
            const string_data = JSON.stringify(given_data);
            fs.ftruncate(file_descriptor, (err2) => {
                if (!err2) {
                    // write to the file and close it
                    fs.writeFile(file_descriptor, string_data, (err3) => {
                        if (!err3) {
                            // close the file
                            fs.close(file_descriptor, (err4) => {
                                if (!err4) callback(false);
                                else callback("Error closing file!");
                            });
                        } else callback("Error writing to file!");
                    });
                } else callback("Error truncating file");
            });
        } else callback("Error updating, File may not exits");
    });
};

data.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${data.base_data_dir + dir}/${file}.json`, (err) => {
        if (!err) callback(false);
        else callback(err);
    });
};

data.list = (dir, callback) => {
    fs.readdir(`${data.base_data_dir + dir}`, (err, file_names) => {
        if (!err && file_names && file_names.length) {
            const trimmed_file_names = [];
            file_names.forEach((file_name) => {
                trimmed_file_names.push(file_name.replace(".json", ""));
            });
            callback(false, trimmed_file_names);
        } else callback("Error reading directory");
    });
};

module.exports = data;
