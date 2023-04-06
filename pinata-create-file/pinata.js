const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const pinataApiKey = '85f17a9895e253ece3a0';
const pinataSecretApiKey = '97652ef65abbf4ff881579222883af767c8bd1433c71397ba92c7689aa328b10';

exports.pinata = async (req, res) => {
    try {
        const folderName = 'jimpfolder';
        const pinataResponse = await createFolder(folderName);
        console.log('Folder created:', pinataResponse);
        if (pinataResponse) {
            const cid = pinataResponse.IpfsHash
            const pinataFile = await uploadFile(cid)
            if (pinataFile) {
                res.send(pinataFile)
            }
        }
    } catch (error) {
        console.error('Error creating folder:', error.response);
        res.status(500).send('Error creating folder');
    }
};

const createFolder = async (folderName) => {
    try {
        const apiUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

        const headers = {
            'Content-Type': 'application/json',
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey
        };
        const response = await axios.post(apiUrl, {
            pinataMetadata: {
                name: folderName,
                keyvalues: {
                    type: 'folder'
                }
            },
            pinataContent: []
        }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }
};

const uploadFile = async (folderCID) => {
    try {
        const fileContent = fs.readFileSync('/home/aravind/Documents/practice/pinata-folder/test-file.json');
        const fileName = 'file.json';
    
        const formData = new FormData();
        formData.append('file', fileContent, { filename: fileName });
    
        const response = await axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS?cid=${folderCID}`, formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey,
          },
        });
    
        console.log('File pinned:', response.data);
        return response.data
      } catch (error) {
        console.error('Error pinning file:', error.response.data);
      }
    }
