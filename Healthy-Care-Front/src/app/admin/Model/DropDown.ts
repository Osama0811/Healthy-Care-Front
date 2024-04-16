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
};

