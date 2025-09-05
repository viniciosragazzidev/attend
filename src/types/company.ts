export interface Company {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserCompanyResponse{
  success: boolean;
  data: Company;
}
export interface CompaniesResponse {
  success: boolean;
  data: Company[];
}

export interface CreateCompanyRequest {
  name: string;
}

export interface CreateCompanyResponse {
  success: boolean;
  data: Company;
}
