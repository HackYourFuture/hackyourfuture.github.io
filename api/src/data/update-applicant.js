/**
 * Updates an applicant (identified by their email address) and stores the provided files
 * to S3.
 *
 * @param {string} email email address of an existing applicant
 * @param {object} updates object containing the applicant's new or updated fields
 */

const { getApplicant, saveApplicant } = require("./update-sheet");

function updateApplicant(email, updates) {
    return new Promise(async (resolve, reject) => {
        const result = await getApplicant(email);
        if (!result.foundedAt) reject("Applicant doesn't exist");

        saveApplicant(result.foundedAt, updates)
            .then(() => resolve("Applicant updated successfully"))
            .catch(error =>
                reject(`Update Applicant ${email}  FAILED: `, error)
            );
    });
}

module.exports = updateApplicant;
