// userModel for mySQL database with fields user_id, therapist_id, name, email, telephone, workplace
class UserModel {
    constructor(user_id, therapist_id, name, email, telephone, workplace) {
        this.user_id = user_id;
        this.therapist_id = therapist_id;
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this.workplace = workplace;
    }
}

module.exports = UserModel;