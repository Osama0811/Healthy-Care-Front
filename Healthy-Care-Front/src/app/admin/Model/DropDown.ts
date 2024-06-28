import { Booking_X_RayComponent } from './../Component/Booking_X_Ray/Booking_X_Ray.component';
export interface DropDownModel {
  id: string;
  name: string;
}
export interface UserDDL {
  id: string;
  nationalNum: string;
}
export interface EnumModel {
  key: string;
  value: number;
}
export interface IEnumDropDown {//get all data table
  key: string | undefined;
  value: number | undefined;
}
export interface userDownModel {
  id: string;
  nationalNum: string;
}
export interface IuserDownModel {
  id: string | undefined;
  nationalNum: string | undefined;
}
export interface hospitalDropDown {
  id: string | undefined;
  name: string | undefined;
}
export interface IhospitalDownModel {
  id: string | undefined;
  name: string | undefined;
}
export interface X_RayDropDown {
  id: string | undefined;
  title: string | undefined;
}
export interface IX_RayDownModel {
  id: string | undefined;
  title: string | undefined;
}
export interface CategoryDropDown {
  id: string | undefined;
  name: string | undefined;
}
export interface ICategoryDownModel {
  id: string | undefined;
  name: string | undefined;
}
export interface DepartmentDropDown {
  id: string | undefined;
  name: string | undefined;
}
export interface IDepartmentDownModel {
  id: string | undefined;
  name: string | undefined;
}
export interface MenusMainDetailsDropDown {
  id: string | undefined;
  name: string | undefined;
}
export interface IMenusMainDetailsDownModel {
  id: string | undefined;
  name: string | undefined;
}
export interface MenusMainDetailsDto {
  id: string | undefined;
  name: string | undefined;
  menuMainName: string | undefined;
  parentName: string | undefined;
  subParentName: string | undefined;
}
export interface IMenusMainDetailsDto {
  id: string | undefined;
  name: string | undefined;
  menuMainName: string | undefined;
  parentName: string | undefined;
  subParentName: string | undefined;
}
export interface AddressDropDown {
  id: string | undefined;
  title: string | undefined;
}
export interface IAddressDownModel {
  id: string | undefined;
  title: string | undefined;
}
export interface DoctorDropDown {
  id: string | undefined;
  typeName: string | undefined;
}
export interface IDoctorDownModel {
  id: string | undefined;
  typeName: string | undefined;
}
export interface PatientDropDown {
  id: string | undefined;
  userName: string | undefined;
}
export interface IPatientDownModel {
  id: string | undefined;
  userName: string | undefined;
}
export interface Booking_X_RayDropDown {
  x_RayId: string | undefined;
  x_RayName: string | undefined;
}
export interface IBooking_X_RayDownModel {
  x_RayId: string | undefined;
  x_RayName: string | undefined;
}
;

