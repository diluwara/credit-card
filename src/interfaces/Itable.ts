export interface IprofilesTableColumns {
  headerName: string;
  field: string;
  width?: number;
}

export interface IProfilesTableData {
  first_name: string;
  last_name: string;
  sex: string;
  dob: string;
  father_name: string;
  address: string;
  aadhar: string;
  credit_card_number: string;
  credit_card_cvv: string;
  credit_card_expiry: string;
  credit_card_provider: string;
  debit_card_number: string;
  debit_card_cvv: string;
  debit_card_expiry: string;
  debit_card_provider: string;
  driving_licence_number: string;
  driving_licence_date_of_issue: string;
  driving_licence_date_of_expiry: string;
  pan_number: string;
  pan_status: string;
  passport_number: string;
  passport_type: string;
  nationality: string;
  passport_date_of_issue: string;
  passport_date_of_expiry: string;
}

export interface ICardsTableData {
  card_provider: string;
  digits: number | string;
  card_number: number | string;
  card_expiry: string;
  card_type: string;
  cvv: string;
}

export interface IprofilesTable {
  data_id: number | string;
  columns: IprofilesTableColumns[];
  data: IProfilesTableData[];
}
export interface ICardsTable {
  data_id: number | string;
  data: ICardsTableData[];
}

export type complex = ICardsTableData | IProfilesTableData;

export interface Itable {
  limit?: number;
  selectedCategory?: string;
  headData: IprofilesTableColumns[];
  bodyData: (ICardsTableData | IProfilesTableData)[];
}
