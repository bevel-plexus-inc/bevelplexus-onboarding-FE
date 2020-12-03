import {gql} from '@apollo/client';
import Axios from 'axios';
import {LOGOUT} from './Redux/Actions/types';

export const REGISTER_USER = gql`
  mutation signUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $referralCode: String!
    $userType: UserType!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        referralCode: $referralCode
        userType: $userType
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      token
      user {
        id
        firstName
        lastName
        email
        createdAt
        userType
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(loginArgs: {email: $email, password: $password}) {
      token
      user {
        id
        firstName
        lastName
        email
        userType
        studentAccountDetail {
          studentNumber
          studentEmail
          country
          countryIso3Code
          school
          yearOfGraduation
          course
          dateOfBirth
        }
        regularAccountDetail {
          address
          city
          postalCode
          country
          countryIso3Code
        }
        userVerification {
          isIdentityVerified
          identityDocumentUrl
          isSchoolEnrollmentVerified
          enrollmentDocumentUrl
          isPhoneNumberVerified
          isEmailVerified
        }
      }
    }
  }
`;

export const AUTHENTICATE_PHONE_NUMBER = gql`
  mutation authenticatePhoneNumber($phoneNumber: String!, $userId: String!) {
    authenticatePhoneNumber(
      phoneNumberArgs: {phoneNumber: $phoneNumber, userId: $userId}
    ) {
      message
      identifier
    }
  }
`;

//logout
export const logoutService = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const REQUEST_RESET_PASSWORD = gql`
  mutation resetPasswordRequest($phoneNumber: String, $email: String) {
    resetPasswordRequest(phoneNumber: $phoneNumber, email: $email) {
      message
      identifier
    }
  }
`;

export const VALIDATE_RESET_OTP = gql`
  mutation validateResetOTP(
    $otp: String!
    $email: String
    $phoneNumber: String
  ) {
    validateResetOTP(
      input: {otp: $otp, email: $email, phoneNumber: $phoneNumber}
    ) {
      message
      identifier
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($password: String!, $formToken: String!) {
    resetPassword(input: {password: $password, formToken: $formToken}) {
      message
      identifier
    }
  }
`;

export const VERIFY_MAIL = gql`
  mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(emailVerificationArgs: {email: $email, token: $token}) {
      message
      identifier
    }
  }
`;

export const VERIFY_PHONE = gql`
  mutation verifyPhoneNumber($phoneNumber: String!, $token: String!) {
    verifyPhoneNumber(
      phoneVerificationArgs: {phoneNumber: $phoneNumber, token: $token}
    ) {
      message
      identifier
    }
  }
`;

export const AddStudentAccountDetails = gql`
  mutation addStudentAccountDetails(
    $userId: String!
    $studentNumber: String!
    $studentEmail: String!
    $country: String!
    $countryIso3Code: String!
    $school: String!
    $yearOfGraduation: DateTime!
    $course: String!
    $dateOfBirth: DateTime!
  ) {
    addStudentAccountDetails(
      accountDetails: {
        userId: $userId
        studentNumber: $studentNumber
        studentEmail: $studentEmail
        country: $country
        countryIso3Code: $countryIso3Code
        school: $school
        yearOfGraduation: $yearOfGraduation
        course: $course
        dateOfBirth: $dateOfBirth
      }
    ) {
      userId
      studentNumber
      studentEmail
      country
      countryIso3Code
      school
      yearOfGraduation
      course
      dateOfBirth
    }
  }
`;

export const AddRegularAccountDetails = gql`
  mutation addRegularAccountDetails(
    $userId: String!
    $address: String!
    $city: String!
    $postalCode: String!
    $country: String!
    $countryIso3Code: String!
  ) {
    addRegularAccountDetails(
      accountDetails: {
        userId: $userId
        address: $address
        city: $city
        postalCode: $postalCode
        country: $country
        countryIso3Code: $countryIso3Code
      }
    ) {
      id
      userId
      address
      city
      postalCode
      country
      countryIso3Code
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const VerifyIdentity = gql`
  mutation verifyIdentity($file: Upload, $userId: String!) {
    verifyIdentity(file: $file, userId: $userId) {
      id
      userId
      isIdentityVerified
      identityDocumentUrl
      isSchoolEnrollmentVerified
      enrollmentDocumentUrl
      isPhoneNumberVerified
      isEmailVerified
      createdAt
      updatedAt
    }
  }
`;
export const verifyEnrollment = gql`
  mutation verifyEnrollment($userId: String!, $file: Upload!) {
    verifyEnrollment(userId: $userId, file: $file) {
      id
      userId
      isIdentityVerified
      identityDocumentUrl
      isSchoolEnrollmentVerified
      enrollmentDocumentUrl
      isPhoneNumberVerified
      isEmailVerified
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const RequestHelp = gql`
  mutation requestHelp($message: String!, $email: String!, $name: String!) {
    requestHelp(message: $message, email: $email, name: $name) 
  }
`;


export const GetUserVerification = gql`
  query getUserVerification($userId: String!) {
    getUserVerification(userId: $userId) {
      id
      userId
      isIdentityVerified
      identityDocumentUrl
      isSchoolEnrollmentVerified
      enrollmentDocumentUrl
      isPhoneNumberVerified
      isEmailVerified
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
