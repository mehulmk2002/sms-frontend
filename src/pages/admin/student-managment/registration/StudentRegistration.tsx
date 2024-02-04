import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import InputTextField from '../../../../components/form/InputTextField';
import FormFieldGroup from '../../../../components/form/FormFieldGroup';
import OptionSelectField from '../../../../components/form/OptionSelectField';

interface StudentData {
  guardian_name: string;
  guardian_phone_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string,
  address: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  last_qualification: string;
  board_university: string;
  percentage: string;
  upload_identity_document: File | null;
  upload_photo: File | null;
  upload_last_qualification_marksheet: File | null;
}

const initialValues: StudentData = {
  guardian_name: '',
  guardian_phone_number: "",
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  address: '',
  email: '',
  phone_number: '',
  last_qualification: '',
  board_university: '',
  percentage: '',
  upload_identity_document: null,
  upload_photo: null,
  upload_last_qualification_marksheet: null,
};

const validationSchema = Yup.object().shape({
  guardian_name: Yup.string().required('Guardian name is required.'),
  guardian_phone_number: Yup.string().required('Guardian phone number is required.'),
  first_name: Yup.string().required('First name is required.'),
  middle_name: Yup.string().required('Middle name is required.'),
  last_name: Yup.string().required('Last name is required.'),
  gender: Yup.string().required('Gender is required.'),
  date_of_birth: Yup.string().required('Date of birth is required.'),
  address: Yup.string().required('Address is required.'),
  email: Yup.string().email('Invalid email format.').required('Email is required.'),
  phone_number: Yup.string().required('Phone number is required.'),
  last_qualification: Yup.string().required('Last qualification is required.'),
  board_university: Yup.string().required('Board/University is required.'),
  percentage: Yup.number().required('Percentage is required.').typeError('Percentage must be a number.'),
  upload_identity_document: Yup.mixed().required('Identity document upload is required.'),
  upload_photo: Yup.mixed().required('Photo upload is required.'),
  upload_last_qualification_marksheet: Yup.mixed().required('Last qualification marksheet upload is required.'),
});


const RegistrationForm: React.FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, (values as any)[key]);
        }
      }
      try {
        console.log(formData);
        console.log(values);
        await axios.post('http://localhost:4000/registration', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Files uploaded successfully!');
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <div className="card p-5 my-5">
        <h1 style={{ textAlign: 'center', color: 'blueviolet' }}>Student Registration</h1>
        <form style={{ marginTop: '50px' }} onSubmit={formik.handleSubmit}>
          <FormFieldGroup title='Student Detail'>
            <div className="form-group col-md-4">
              <InputTextField
                type="text"
                placeholder="First Name"
                isvalid={formik.touched.first_name && !formik.errors.first_name}
                id="first_name"
                name="first_name"
                label="First Name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </div>
            <div className="form-group col-md-4">
              <InputTextField
                type="text"
                placeholder="Middle Name"
                isvalid={formik.touched.middle_name && !formik.errors.middle_name}
                id="middle_name"
                name="middle_name"
                label="Middle Name"
                value={formik.values.middle_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.middle_name && Boolean(formik.errors.middle_name)}
                helperText={formik.touched.middle_name && formik.errors.middle_name}
              />
            </div>
            <div className="form-group col-md-4">
              <InputTextField
                type="text"
                placeholder="Last Name"
                isvalid={formik.touched.last_name && !formik.errors.last_name}
                id="last_name"
                name="last_name"
                label="Last Name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </div>
            <div className="form-group col-md-4">
              <InputTextField
                type="date"
                placeholder="Date"
                isvalid={formik.touched.date_of_birth && !formik.errors.date_of_birth}
                id="date_of_birth"
                name="date_of_birth"
                label="DOB"
                value={formik.values.date_of_birth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
              />
            </div>
            <div className="form-group col-md-4">
            <OptionSelectField
                valueArray={['Male', 'Female']}
                isvalid={formik.touched.gender && !formik.errors.gender}
                id="gender"
                name="gender"
                label="Gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              /></div>
          </FormFieldGroup>

          <FormFieldGroup title='Guardian / Parents Information'>

            <div className="form-group col-md-4">
              <InputTextField
                type="text"
                placeholder="Guardian name"
                isvalid={formik.touched.guardian_name && !formik.errors.guardian_name}
                id="guardian_name"
                name="guardian_name"
                label="Guardian Name"
                value={formik.values.guardian_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.guardian_name && Boolean(formik.errors.guardian_name)}
                helperText={formik.touched.guardian_name && formik.errors.guardian_name}
              />

            </div>
            <div className="form-group col-md-4">
              <InputTextField
                type="text"
                placeholder="Guardian Phone Number"
                isvalid={formik.touched.guardian_phone_number && !formik.errors.guardian_phone_number}
                id="guardian_phone_number"
                name="guardian_phone_number"
                label="Guardian Phone Number"
                value={formik.values.guardian_phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.guardian_phone_number && Boolean(formik.errors.guardian_phone_number)}
                helperText={formik.touched.guardian_phone_number && formik.errors.guardian_phone_number}
              />
            </div>
          </FormFieldGroup>
          <FormFieldGroup title='Contact Infomation'>

            <div className="form-group col-md-4">
              <InputTextField
                type="text"
                placeholder="Address"
                isvalid={formik.touched.address && !formik.errors.address}
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />

            </div>
            <div className="form-group col-md-4">

              <InputTextField
                type="text"
                placeholder="Phone Number"
                isvalid={formik.touched.phone_number && !formik.errors.phone_number}
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                helperText={formik.touched.phone_number && formik.errors.phone_number}
              />

            </div>
            <div className="form-group col-md-4">

              <InputTextField
                type="text"
                placeholder="Email"
                isvalid={formik.touched.email && !formik.errors.email}
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />


            </div>


          </FormFieldGroup>

          <FormFieldGroup title='Education Details'>
            <div className="form-group col-md-4">

              <InputTextField
                type="text"
                placeholder="Last Qualification"
                isvalid={formik.touched.last_qualification && !formik.errors.last_qualification}
                id="last_qualification"
                name="last_qualification"
                label="last_qualification"
                value={formik.values.last_qualification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.last_qualification && Boolean(formik.errors.last_qualification)}
                helperText={formik.touched.last_qualification && formik.errors.last_qualification}
              />



            </div>
            <div className="form-group col-md-4">

              <InputTextField
                type="text"
                placeholder="Board University"
                isvalid={formik.touched.board_university && !formik.errors.board_university}
                id="board_university"
                name="board_university"
                label="board_university"
                value={formik.values.board_university}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.board_university && Boolean(formik.errors.board_university)}
                helperText={formik.touched.board_university && formik.errors.board_university}
              />

            </div>
            <div className="form-group col-md-4">
              <InputTextField
                type="text"
                placeholder="Percentage"
                isvalid={formik.touched.percentage && !formik.errors.percentage}
                id="percentage"
                name="percentage"
                label="percentage"
                value={formik.values.percentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.percentage && Boolean(formik.errors.percentage)}
                helperText={formik.touched.percentage && formik.errors.percentage}
              />

            

            </div>
          </FormFieldGroup>
          <FormFieldGroup title='Upload Documents'>
            <div className="form-group col-md-4">
              <div className="fv-row mb-3 ">
                <label htmlFor="upload_photo" className='form-label fw-bolder text-dark fs-6 mb-0'>Upload Photo*</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="upload_photo"
                  name="upload_photo"
                  onChange={(event) => {
                    formik.setFieldValue('upload_photo', event.currentTarget.files?.[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.upload_photo && formik.errors.upload_photo && (
                  <div className="text-danger">{formik.errors.upload_photo}</div>
                )}
              </div>
            </div>
            <div className="form-group col-md-4">
              <div className="fv-row mb-3 ">

                <label htmlFor="upload_photo" className='form-label fw-bolder text-dark fs-6 mb-0'>Upload Identity Document*</label>

                <input
                  type="file"
                  className="form-control-file"
                  id="upload_identity_document"
                  name="upload_identity_document"
                  onChange={(event) => {
                    formik.setFieldValue('upload_identity_document', event.currentTarget.files?.[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.upload_identity_document && formik.errors.upload_identity_document && (
                  <div className="text-danger">{formik.errors.upload_identity_document}</div>
                )}
              </div></div>

            <div className="form-group col-md-4">
              <div className="fv-row mb-3 ">
                <label htmlFor="upload_last_qualification_marksheet" className='form-label fw-bolder text-dark fs-6 mb-0'>Upload Last Qualification Marksheet*</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="upload_last_qualification_marksheet"
                  name="upload_last_qualification_marksheet"
                  onChange={(event) => {
                    formik.setFieldValue('upload_last_qualification_marksheet', event.currentTarget.files?.[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.upload_last_qualification_marksheet &&
                  formik.errors.upload_last_qualification_marksheet && (
                    <div className="text-danger">{formik.errors.upload_last_qualification_marksheet}</div>
                  )}
              </div></div>
          </FormFieldGroup>
          <div className="form-row text-center" style={{ marginTop: '30px' }}>
            <div className="form-group col-md-12 ">
              <button type="submit" className="btn btn-lg btn-primary px-10" style={{ marginRight: '10px' }}>
              Register
              </button>
              <button type="reset" className="btn btn-lg btn-danger px-10">
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
