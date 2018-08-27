/**
 * Updates an applicant (identified by their email address) and stores the provided files
 * to S3.
 *
 * @param {string} email email address of an existing applicant
 * @param {object} updates object containing the applicant's new or updated fields
 */

const { getApplicant, saveApplicant } = require("./update-sheet");

async function updateApplicant(email, updates) {
    let foundedAt;
    try {
        const res = await getApplicant(email);
        foundedAt = res.foundedAt;
        if (!foundedAt) {
            throw new Error("Applicant doesn't exist");
        }
    } catch (error) {
        if (error.message === "Applicant doesn't exist") {
            return error;
        }
    }

    saveApplicant(foundedAt, updates).catch(error => {
        console.log("Update Applicant FAILED:", error, email);
    });
}

module.exports = updateApplicant;
