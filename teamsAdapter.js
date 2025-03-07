module.exports = {
    process: async (req, res, next) => {
        console.log("Processing Teams message...");
        next();
    }
};
