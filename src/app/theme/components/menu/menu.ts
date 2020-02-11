import { Menu } from './menu.model';
export let verticalMenuItems = []
export let horizontalMenuItems = []
// export const verticalMenuItems = [
//     // new Menu (1, 'Page Centrale', '/page-centrale', null, 'file-text-o', null, false, 0),
//     new Menu (1, 'Mon tableau de bord', '/dashboard', null, 'tachometer', null, false, 0),
//     new Menu (3, 'Courriers Arrivés', null, null, 'envelope-o', null, true, 0),
//    // new Menu (4, 'Nouveau courrier', '/courriers-arrives', null, 'plus-square', null, false, 3),
//     new Menu (5, 'Consultation CA', '/gridcourriers', null, 'list', null, false, 3),
//
//     new Menu (6, 'Courriers Départs', null, null, 'envelope-open', null, true, 0),
//    // new Menu (7, 'Nouveau courrier', '/courriers-departs', null, 'plus-square', null, false, 6),
//     new Menu (8, 'Consultation CD', '/courriers', null, 'list', null, false, 6),
//
//     new Menu (9, 'Courriers Internes', null, null, 'paper-plane', null, true, 0),
//  // new Menu (10, 'Nouveau courrier', '/courriers-internes', null, 'plus-square', null, false, 9),
//     new Menu (11, 'Consultation CI', '/gridcourriersinternes', null, 'list', null, false, 9),
//
//     new Menu (6, 'Tous les courriers', '/gridtouscourrier', null, 'envelope-o', null, false, 0),
//
//      new Menu (7, 'Administration', '/administration', null, 'cog', null, false, 0),
//
//     new Menu (8, 'Interface de recherhe', '/search-interface', null, 'envelope-o', null, false, 0),
//
// ]

export const profileMMUser=[
    new Menu (1, 'Mon tableau de bord', '/dashboard', null, 'tachometer', null, false, 0),
    new Menu (2, 'Courriers Arrivés', null, null, 'envelope-o', null, true, 0),
             new Menu (3, 'Consultation CA', '/gridcourriers', null, 'list', null, false, 2),
             new Menu (4, 'Par Date', '/par date', null, 'calendar', null, false, 2),
             new Menu (5, 'Par Référence', '/par refernce', null, 'bookmark', null, false, 2),
             new Menu (6, 'Par Expéditeur', '/par Expediteur', null, 'male', null, false, 2),
             new Menu (7, 'Courriers Integrer', '/courrierintegrer', null, 'envelope-o', null, false, 2),

    new Menu (8, 'Courriers Départs', null, null, 'envelope-open', null, true, 0),
         new Menu (9, 'Consultation CD', '/courriers', null, 'list', null, false, 8),
    new Menu (10, 'Courriers Internes', null, null, 'paper-plane', null, true, 0),
         new Menu (11, 'Consultation CI', '/gridcourriersinternes', null, 'list', null, false, 10),
    new Menu (12, 'Tous les courriers', '/gridtouscourrier', null, 'envelope-o', null, false, 0),
    new Menu (13, 'Interface de recherhe', '/search-interface', null, 'envelope-o', null, false, 0),


]
export const profileAdminApplication=[
    new Menu (1, 'Mon tableau de bord', '/dashboard', null, 'tachometer', null, false, 0),
    new Menu (2, 'Courriers Arrivés', null, null, 'envelope-o', null, true, 0),
    new Menu (3, 'Consultation CA', '/gridcourriers', null, 'list', null, false, 2),
    new Menu (4, 'Par Date', '/par date', null, 'calendar', null, false, 2),
    new Menu (5, 'Par Référence', '/par refernce', null, 'bookmark', null, false, 2),
    new Menu (6, 'Par Expéditeur', '/par Expediteur', null, 'male', null, false, 2),
    new Menu (7, 'Courriers Integrer', '/courrierintegrer', null, 'envelope-o', null, false, 2),

    new Menu (8, 'Courriers Départs', null, null, 'envelope-open', null, true, 0),
    new Menu (9, 'Consultation CD', '/courriers', null, 'list', null, false, 8),
    new Menu (10, 'Courriers Internes', null, null, 'paper-plane', null, true, 0),
    new Menu (11, 'Consultation CI', '/gridcourriersinternes', null, 'list', null, false, 10),
    new Menu (12, 'Tous les courriers', '/gridtouscourrier', null, 'envelope-o', null, false, 0),
    new Menu (13, 'Interface de recherhe', '/search-interface', null, 'envelope-o', null, false, 0),

    new Menu (14, 'Administration', '/administration', null, 'cog', null, false, 0),
]

// export const horizontalMenuItems = [
//     new Menu (1, 'Mon tableau de bord', '/dashboard', null, 'tachometer', null, false, 0),
//     new Menu (3, 'Courriers Arrivés', null, null, 'envelope-o', null, true, 0),
//     // new Menu (4, 'Nouveau courrier', '/courriers-arrives', null, 'plus-square', null, false, 3),
//     new Menu (5, 'Consultation CA', '/gridcourriers', null, 'list', null, false, 3),
//
//     new Menu (6, 'Courriers Départs', null, null, 'envelope-open', null, true, 0),
//     // new Menu (7, 'Nouveau courrier', '/courriers-departs', null, 'plus-square', null, false, 6),
//     new Menu (8, 'Consultation CD', '/courriers', null, 'list', null, false, 6),
//
//     new Menu (9, 'Courriers Internes', null, null, 'paper-plane', null, true, 0),
//     // new Menu (10, 'Nouveau courrier', '/courriers-internes', null, 'plus-square', null, false, 9),
//     new Menu (11, 'Consultation CI', '/gridcourriersinternes', null, 'list', null, false, 9),
//
//     new Menu (6, 'Tous les courriers', '/gridtouscourrier', null, 'envelope-o', null, false, 0),
//
//     new Menu (7, 'Administration', '/administration', null, 'cog', null, false, 0),
//
//     new Menu (8, 'Interface de recherhe', '/search-interface', null, 'envelope-o', null, false, 0),
//
// ]

export function clearHorizontalMenuItems()
{
    horizontalMenuItems = []

}
let profile='';
if(localStorage.getItem("profiles")) {
    profile = localStorage.getItem("profiles")
    console.log("profiler",profile);
}

if (profile ==='MMAdmin') {
    horizontalMenuItems=profileAdminApplication;
} else  {
    horizontalMenuItems=profileMMUser;
}
