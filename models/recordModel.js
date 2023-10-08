class RecordModel {
    // record_id,     patient_id,    date,     vowel_a,     vowel_e,     vowel_i,     vowel_o,     vowel_u
    constructor(record_id, patient_id, vowel_a, vowel_e, vowel_i, vowel_o, vowel_u) {
        this.record_id = record_id;
        this.patient_id = patient_id;
        this.vowel_a = vowel_a;
        this.vowel_e = vowel_e;
        this.vowel_i = vowel_i;
        this.vowel_o = vowel_o;
        this.vowel_u = vowel_u;
    }

}

module.exports = RecordModel;