import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
This Service controls various attributes, that are used for the property window
*/
export class PropertyDataService {
  
  /*
  currentPropertySubject : Contains which property was last clicked on
  currentDistributionSubject : Contains which distribution was last clicked on 
  currentDistributionParametersSubject : Contains the distribution parameters of the currentDistributionSubject
  */
  private currentPropertySubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private currentDistributionSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private currentDistributionParametersSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor() {}

  // Setter for currentPropertySubject
  public setProperty(property : string) : void {
    this.currentPropertySubject.next(property);
  }

  // Getter for currentPropertySubject
  public getProperty() : Observable<string> {
    return this.currentPropertySubject.asObservable();
  }

  // Setter for currentDistributionSubject
  public setDistribution(distribution : string) : void {
    this.currentDistributionSubject.next(distribution);
  }

  // Getter for currentDistributionSubject
  public getDistribution() : Observable<string> {
    return this.currentDistributionSubject.asObservable();
  }
  
  // Setter for currentDistributionParametersSubject
  public setDistributionParameter(parameters : number[]) : void {
    this.currentDistributionParametersSubject.next(parameters);
  }

  // Getter for currentDistributionParametersSubject
  public getDistributionParameters() : Observable<number[]> {
    return this.currentDistributionParametersSubject.asObservable();
  }

}
