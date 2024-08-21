import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
  })
  export class DataService {
    private apiUrl = 'http://localhost:3000/show'; // URL of the API
  
    constructor(private http: HttpClient) {}
  

    // Fetching the items from the API using the query parameters given
    getItems(queryParams: any) {
      let params = new HttpParams();

      // Loop through the query parameters and append them to the params object
      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          const value = queryParams[key];
          // If the value is an object, stringify it
          if (typeof value === 'object') {
            params = params.append(key, JSON.stringify(value));
          } 
          else if (typeof value === 'string') {
            // For string queries, append them directly
            params = params.append(key, value);
          }
          else {
            params = params.append(key, value.toString());
          }
        }
      }
      return this.http.get<any[]>(this.apiUrl, { params: params });
    }


  // Building the query parameters for the API and adding operators for filtering
  buildQueryParams(filters: any[]): { [key: string]: any } {
    let queryParams: { [key: string]: any } = {};
    filters.forEach(filter => {
      let value = filter.inputValue;
    // Check if value can be converted to a number
    if (!isNaN(value) && value.trim() !== '') {
      value = Number(value);
    }

    if (typeof value === 'string') {
      value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
    }

   

      switch (filter.filterType) {
          case 'greaterThan':
            queryParams[filter.attribute] = { $gt: value };
            break;
          case 'lessThan':
            queryParams[filter.attribute] = { $lt: value };
            break;
          case 'equals':
            queryParams[filter.attribute] = { $eq: value };
            break;
          case 'contains':
            queryParams[filter.attribute] = { $regex: '.*' + value + '.*', $options: 'i' };
            break;
          case 'startsWith':
            queryParams[filter.attribute] = { $regex: '^' + value, $options: 'i' };
            break;
          case 'endsWith':
            queryParams[filter.attribute] = { $regex: value + '$', $options: 'i' };
            break;
      }})
    
      //calling the buildMongoQuery function to convert the query to a mongo query
      queryParams = this.buildMongoQuery(queryParams)
  
    return queryParams;
  }

  // converting the query to a mongo query using json.parse
  buildMongoQuery(params: { [key: string]: any }): { [key: string]: any } {
    let query: { [key: string]: any } = {};
  
    for (let key in params) {
      try {
        // Parse the parameter value as JSON for MongoDB operators
        query[key] = JSON.parse(params[key]);
      } catch (e) {
        // If it's not JSON, use the value as-is
        query[key] = params[key];
      }
    }
  
    return query;
  }
  

  }
  