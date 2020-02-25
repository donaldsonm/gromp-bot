var functions = {

    /**
     * Function: isURL
     * 
     * Description: Takes in a given string and checks if it is a valid URL through regex.
     * Adapted by https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/49849482
     * from Devshed.
     * 
     * @param {String} text The string to be checked
     * 
     * @return {boolean} Whether or not the string is a valid URL
     */
    isURL: function (str) {

        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        
        return !!pattern.test(str);
    },

    /**
     * Function: isURLImage
     * 
     * Description: Takes in a given URL in string form and checks if it is an image
     * by checking the 3-4 letter extension at the end of the URL.
     * 
     * @param {String} url A URL
     * 
     * @return {boolean} Whether or not the URL is an image
     */
    isURLImage: function (url) {

        // Remove 'GET' queries
        url = url.split('?')[0];

        // Separate the URL and only take the image format if it exists
        let parts = url.split('.');
        let imageFormat = parts[parts.length - 1].toLowerCase();

        // Create list of most common image formats
        let extensions = ["jpg","jpeg","png","gif",
            "tiff","psd","bmp","webp"];

        // If image format is in the list then the URL is an image
        if (extensions.includes(imageFormat)) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = {
    isURL: functions.isURL,
    isURLImage: functions.isURLImage
}