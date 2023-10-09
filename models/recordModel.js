class RecordModel {
    // record_id,     patient_id,    date,     vowel_a,    vowel_i,     vowel_u, comment
    constructor(record_id, patient_id, vowel_a, vowel_i, vowel_u, comment) {
        this.record_id = record_id;
        this.patient_id = patient_id;
        this.vowel_a = vowel_a;
        this.vowel_i = vowel_i;
        this.vowel_u = vowel_u;
        this.comment = comment;
    }


}

module.exports = RecordModel;