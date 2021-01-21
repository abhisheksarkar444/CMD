import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AccountSettingService } from './account-service/settings-service';
import { AuthService } from '../shared/services/AuthService';


@Component({
  selector: 'kkd-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  profile: any;
  imageUrl = "https://www.docsapp.in/website_assets/main-page/aditi-kunte.jpg";
  img1:any;
  name = 'Angular 4';
  fileUpload: File;
  url: string = '';
  fullName: string;
  pLocation: string;
  npi: string;
  pUniqueId: string;
  physician : any;

  phy:any;

  constructor(private formBuilder: FormBuilder, private settingservice: AccountSettingService,
    private authSerice: AuthService) { }


  profileform = new FormGroup
    ({
      Name: new FormControl(''),
      NPIno: new FormControl(''),
      PracticeLocation: new FormControl('')
    });

  location :any;
  ngOnInit() {
    this.pUniqueId = this.authSerice.getuserUniqueId();  // use it when it's required 
    
    this.settingservice.getProfileDetails(this.pUniqueId).subscribe(profile => {
      this.fullName = profile.firstName + " " + profile.lastName;
      this.pLocation = "Not Available";
      this.npi = "Not Available";
      console.log('Image Url', this.imageUrl);
    })
  }

  onSelectFile(file: FileList) {
    this.fileUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.imageUrl = event.target.result;
    } 
    reader.readAsDataURL(this.fileUpload); // To Display the Picture
    this.settingservice.postImage(this.pUniqueId, this.fileUpload).subscribe(
      () => {
        console.log('done');
      }

    );
  }
}