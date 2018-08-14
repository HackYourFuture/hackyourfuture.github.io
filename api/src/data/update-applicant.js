/**
 * Updates an applicant (identified by their email address) and stores the provided files
 * to S3.
 *
 * @param {string} email email address of an existing applicant
 * @param {object} updates object containing the applicant's new or updated fields
 * @param {object[]} files files to be stored to S3
 */
async function updateApplicant(email, updates, files) {

}

module.exports = updateApplicant;
