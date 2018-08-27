/**
 * Updates an applicant (identified by their email address) and stores the provided files
 * to S3.
 *
 * @param {string} email email address of an existing applicant
 * @param {object} updates object containing the applicant's new or updated fields
 */

const { getApplicant, saveApplicant } = require("./update-sheet");

async function updateApplicant(email, updates) {
    const APPLICANT_DOESNT_EXIST = "Applicant doesn't exist";
    try {
        const result = await getApplicant(email);
        if (!result.foundedAt) {
            throw new Error(APPLICANT_DOESNT_EXIST);
        }

        await saveApplicant(result.foundedAt, updates);
        return "Applicant updated successfully";
    } catch (error) {
        if (error === APPLICANT_DOESNT_EXIST) {
            return APPLICANT_DOESNT_EXIST;
        }
        return `Update Applicant ${email}  FAILED: ` + error;
    }
}

module.exports = updateApplicant;
