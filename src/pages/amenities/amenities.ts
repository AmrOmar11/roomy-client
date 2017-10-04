import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AmenitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-amenities',
  templateUrl: 'amenities.html',
})
export class AmenitiesPage {
	public amenities:any = [{img:'https://photos-5.dropbox.com/t/2/AACrE7FxBd6Pdybf0YSVHWB2ILA7LHMGmL1768muXhBUsQ/12/504313574/png/32x32/3/1507111200/0/2/2%20people.svg/EPKK8-YFGNwCIAcoBw/B5B4NcoagxXJnwMvsHWQ5eHX57kLcKJ0jC_-fKosP14?dl=0&size=1600x1200&size_mode=3',text:'Max 2 people'},
							{img:'https://photos-1.dropbox.com/t/2/AABq_6Cmx-Nzrnh_gWOF9fN6IwbGBVny3nBe4WSMi59PAA/12/504313574/png/32x32/3/1507111200/0/2/bed%20icon.svg/EPKK8-YFGNwCIAcoBw/NuhJYbPyeoOuG8AgalsXVDCDglv8FAaC-sboekArFKU?dl=0&size=1600x1200&size_mode=3',text:'1 Queen bed'},
							{img:'https://photos-6.dropbox.com/t/2/AACDWaX1i4z5bTbnectoXq7UgNBZzrTJmcz7cEJ9UHL8Bw/12/504313574/png/32x32/3/1507111200/0/2/hotel%20icon.svg/EPKK8-YFGNwCIAcoBw/itg25ACAv7bUX0B7RNic22e35SYm-Zb0rQ9V6lt4N7s?dl=0&size=1600x1200&size_mode=3',text:'Restaurant'},
							{img:'https://photos-4.dropbox.com/t/2/AAD6-kZWCG89xx9kBlXmHsZWMrA4dybVdgfop3TURn8ucw/12/504313574/png/32x32/3/1507111200/0/2/wifi%20icon.svg/EPKK8-YFGNwCIAcoBw/kHrw4gQmtObiFTipxOlKKtadL1Li9bJ6WELkeZjIfAo?dl=0&size=1600x1200&size_mode=3',text:'Wifi'},
							{img:'https://photos-3.dropbox.com/t/2/AACgY5KvMpDJE6qo__BIY-ltqdVtgpt9NzUkVLBOfAzxSA/12/504313574/png/32x32/3/1507111200/0/2/swimming%20icon.svg/EPKK8-YFGNwCIAcoBw/30R2YdK1AMp-eqLcu6gKJSr-TtIuyLpJ2-35YqVuqgk?dl=0&size=1600x1200&size_mode=3',text:'Swimming Pool'},
							{img:'https://photos-1.dropbox.com/t/2/AACclSDQIQlzCF6I0c08e8Ica3OyovdJoRv0dayq26g3KQ/12/504313574/png/32x32/3/1507111200/0/2/bar%20icon.svg/EPKK8-YFGNwCIAcoBw/OE9Z_xqKO9gTQ4UnKyZljWaOZM8qKCvdLGAWCdDibtY?dl=0&size=1600x1200&size_mode=3',text:'Bar'},
							{img:'https://photos-1.dropbox.com/t/2/AACR1mtaE2qKW73Pm8R61ECrBXfpOr9Ao3dre-RBPod5eQ/12/504313574/png/32x32/3/1507111200/0/2/TV%20icon.svg/EPKK8-YFGNwCIAcoBw/ld2gd3uKs8jPCpnIK1lGuDfUijxzIVUvKxLDapfDkKY?dl=0&size=1600x1200&size_mode=3',text:'Television'},
							{img:'https://photos-1.dropbox.com/t/2/AACP7ykd-BkMNzcqr1VjCByZHsj1fCu50mzpBMJVCf4R7Q/12/504313574/png/32x32/3/1507111200/0/2/shower%20icon.svg/EPKK8-YFGNwCIAcoBw/oVjkBiuUoWCgwF-obtcK3Ri-axOH2NVHeVfq_oTN0p0?dl=0&size=1600x1200&size_mode=3',text:'Shower'}						
						];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmenitiesPage');
  }

}
