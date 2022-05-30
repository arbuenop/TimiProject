import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileDbService } from 'src/app/shared/services/database/profile.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { SwalService } from 'src/app/shared/services/swal.service';
import { ElementRef, ViewChild } from '@angular/core'

import Swal from 'sweetalert2';
import { ProfileModel } from 'src/app/models/profile/profile-model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('bio') bio: ElementRef;
  @ViewChild('age') age: ElementRef

  constructor(
    public location: Location,
    public profileService: ProfileService,
    public dbService: ProfileDbService,
    public swalService: SwalService,
    public router: Router,
    ) { }

  profile: ProfileModel = {
    userName: '',
    biography: '',
    location: '',
    age: '',
    rating: 0,
    photoURL: ''
  }
  // LABELS
  backBtnLabel = 'Atrás';
  userNameLabel = '';
  bioLabel = '';
  locationLabel = '';
  ageLabel = '';
  rating = 0

  setLabels(){
    this.userNameLabel = this.profile.userName;
    this.bioLabel = this.profile.biography
    this.locationLabel = this.profile.location
    this.ageLabel = this.profile.age
    this.rating = this.profile.rating
  }

  ratingCounter(i: number) {
    return new Array(i);
  }

  testAgeLocation(){
    if(this.profile.age == "?" || this.profile.location == "?"){
      if(this.profile.age == "?"){
        this.swalService.ageProfile().then( (swal: { isConfirmed: any; value: string; }) => {
          if(swal.isConfirmed){
            //LOCATION
            /*
             this.swalService.locationProfile().then((swal: { isConfirmed: any; value: string; }) => {


            })*/
            this.dbService.updateAgeUserProfile(swal.value,JSON.parse(localStorage.getItem("user")).uid);
            this.age.nativeElement.innerHTML = swal.value

          }else{
             this.swalService.warningProfile().then((warn: {isConfirmed: any}) => {
              console.log(warn)
              if(!warn.isConfirmed){
                this.ngOnInit()
               }else{
                 this.router.navigate(['/'])
              }
            })
          }
        })
      }
    }
  }

  changeBio(){
    console.log(this.bio.nativeElement.value)
    this.dbService.updateBioUserProfile(this.bio.nativeElement.value,JSON.parse(localStorage.getItem("user")).uid)
  }

  ngOnInit(): void {
    this.profileService.getUserProfile();
    this.profile = JSON.parse(sessionStorage.getItem("user-profile"))
    this.testAgeLocation()
    this.setLabels()

  }
}
