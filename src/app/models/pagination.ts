export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

// Create a generic paginated response.
export class PaginatedResponse<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  } 
}