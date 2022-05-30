import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { FilterPageComponent } from '../filter-page/filter-page.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SettingsComponent } from '../settings/settings.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, redirectTo:'dashboard' },
  {
    path: '', component: HomeComponent, children: [
      { path: 'settings', component: SettingsComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'search-users', component: FilterPageComponent },

    ],
  },
    { path: '404-not-found', component: NotFoundComponent },
    { path: '/**', component: NotFoundComponent, pathMatch: 'full', redirectTo:'init'},
    { path: '**', component: NotFoundComponent, pathMatch: 'full', redirectTo:'init' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
