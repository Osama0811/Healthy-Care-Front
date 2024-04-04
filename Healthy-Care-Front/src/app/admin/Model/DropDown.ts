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
  hospitalName: string | undefined;
}
export interface IhospitalDownModel {
  id: string | undefined;
  hospitalName: string | undefined;
}
export interface CategoryDropDown {
  id: string | undefined;
  name: string | undefined;
}
export interface ICategoryDownModel {
  id: string | undefined;
  name: string | undefined;
}

