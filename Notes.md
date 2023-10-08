### Therapist Endpoints

#### Get Therapist Details
- **Endpoint**: `/therapist`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Retrieves details of the therapist based on the provided JWT token.

#### Edit Therapist Details
- **Endpoint**: `/therapist`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Edits details of the therapist based on the provided JWT token.

#### Delete Therapist
- **Endpoint**: `/therapist`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Deletes the therapist based on the provided JWT token.

#### Create a New Patient
- **Endpoint**: `/patients`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Creates a new patient entry associated with the therapist.

#### Add Report for a Patient
- **Endpoint**: `/patients/:patient_id/reports`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Adds a report for a specific patient.

#### View Patient Details
- **Endpoint**: `/patients/:patient_id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Retrieves details of a specific patient.

#### Edit Patient Details
- **Endpoint**: `/patients/:patient_id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Edits details of a specific patient.

#### Delete a Patient
- **Endpoint**: `/patients/:patient_id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Deletes a specific patient.

#### Get Reports of a Patient
- **Endpoint**: `/patients/:patient_id/reports`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Retrieves reports for a specific patient.

#### Get Report Details
- **Endpoint**: `/reports/:report_id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Description**: Retrieves details of a specific report.



#### Note:
- `<JWT_TOKEN>` should be replaced with the actual JWT token obtained from Firebase.
- `:patient_id` and `:report_id` are dynamic parameters that should be replaced with actual IDs in the request URLs.
