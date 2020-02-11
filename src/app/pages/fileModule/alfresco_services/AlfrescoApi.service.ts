import {Injectable} from '@angular/core';
import * as AlfrescoApi from "alfresco-js-api";
import { NodeBody } from 'alfresco-js-api';

const alfrescoJsApi = new AlfrescoApi({
 ticketEcm: '',
  hostEcm: 'http://alfrescodev.picosoft.biz',
});


@Injectable({
    providedIn: 'root'
})

export class AlfrescoService {
    filee: File;

    constructor() {


    }


    //  public pathAlfersco: any;
    public pathAlfersco: any[] = [];


    isLoggedIn() {
        return alfrescoJsApi.isLoggedIn();
    }

    getContentUrl(nodeRef) {
        return new Promise(
            (resolve, reject) => {
                resolve(alfrescoJsApi.content.getContentUrl(nodeRef));
            }
        );
    }


    // updatenoderef(courrier, nodeRef){
    //    alfrescoJsApi.    }

    getTocken() {
        return alfrescoJsApi.getTicketEcm();
    }

    setTocken(ticket) {
        alfrescoJsApi.setTicket(ticket, '');
    }


    createFoldercallback(folder, parentFolder, callback) {
        alfrescoJsApi.nodes.createFolder(folder, parentFolder).then(function (data) {
            console.log("Created folder");
            return callback(data);
        })

    }

    getmodel() {
        var opts = {
            'filter': 'myReusableForms',
            'modelType': 2
        };

        alfrescoJsApi.activiti.modelsApi.getModels(opts).then(function (data) {
            console.log('All your reusable forms' + data);
        }, function (error) {
            console.log('Error' + error);
        });


    }

    importwithnewversion(modelId, file) {

        console.log('importwithNewVersion')
        alfrescoJsApi.activiti.modelsApi.importNewVersion(modelId, file);
    }


    loginWithUsernameAndPassword(username, password): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                //------------> in case we want use alfresco-js-api
                alfrescoJsApi.login(username, password).then(data => {
                    // this.getFolders();
                    resolve(data);
                    console.log("data", data)
                }, error => {
                    reject(error);
                });
            }
        );
    }

    loginWithToken(ticket) {
        return new Promise(
            (resolve, reject) => {
                alfrescoJsApi.loginTicket(ticket)
                    .then(
                        data => {
                            // this.getFolders();
                            resolve(data);
                        },
                        error => {
                            reject(error);
                        });
            });
    }

    getNodeInfo(nodeId) {
        return new Promise(
            (resolve, reject) => {
                alfrescoJsApi.nodes.getNodeInfo(nodeId)
                    .then(
                        data => {
                            resolve(data);
                        },
                        error => {
                            reject(error);
                        });
            }
        );
    }


    getfile(nodeId) {
        // alfrescoJsApi.core.nodesApi.getFileContent(nodeId).then(function (data) {
        // fs.writeFile('./test/grass.jpg', data, function (error) {
        //             //     if (error) {
        //             //         console.error(error);
        //             //         return;
        //             //     }
        //             //     console.log('The file was saved!');
        //             //     console.log("file", data)
        //             // }),
        //             //      function (error) {
        //             //     console.error(error);
        //             // }
        //          ;});


        //     // alfrescoJsApi.core.nodesApi.getFileContent(nodeId).then(function(data) {
        //     //     fs.writeFile('c:/test.docx', data, function(error) {
        //     //     if (error) {
        //     //         console.error(error);
        //     //         return;
        //     //     }
        //     //     console.log('The file was saved!');
        //     });
        // }, function(error) {
        //     console.error(error);
        // });


    }




    uploadnewversion (file,nodref,type){






    }


    getNodeChildswithPath(nodeId,relativePath): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                alfrescoJsApi.nodes.getNodeChildren(nodeId, {"relativePath":relativePath})
                    .then(
                        data => {
                            resolve(data);
                        },
                        error => {
                            reject(error);
                        });
            }
        );
    }
    getNodeChilds(nodeId): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                alfrescoJsApi.nodes.getNodeChildren(nodeId)
                    .then(
                        data => {
                            resolve(data);
                        },
                        error => {
                            reject(error);
                        });
            }
        );
    }

    toUploadFiles(parentId, path, file): any {
        console.log('drrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        console.log(parentId);
        console.log('drrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        alfrescoJsApi.upload.uploadFile(file, path, parentId).then(function () {
            console.log('File Uploaded in the from parentFolder ' + parentId + ' n folderX/folderY/folderZ');
            console.log(parentId);
         // console.log(file.name);
            console.log(file);
            return ("hello");
            }, function (error) {
                console.log('Error during the upload' + error);
            })
    }


    getNodeContent(nodeId): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                alfrescoJsApi.nodes.getNodeContent(nodeId).then(data => {
                    resolve(data);
                }, error => {
                    resolve(error)
                });
            }
        );
    }

    createFolder(folderName, folderPath, parentFolderNodeRef) {
        return new Promise(
            (resolve, reject) => {
                alfrescoJsApi.nodes.createFolder(folderName, folderPath, parentFolderNodeRef).then(
                    response => {

                        resolve(response);
                    }, (error) => {
                        reject(error);
                    });
            }
        )
    }

    deleteNode(nodeId) {
        console.log(nodeId);
        alfrescoJsApi.nodes.deleteNode(nodeId).then(() => {
            console.log('API called successfully.');
        }, function (error) {
            console.error(error);
        });
    }

    editNode(nodeId, name, titre, desc) {
        const nodeBody = <NodeBody>{};
        nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY] = {};
        nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY][RepositoryContentModel.TITLE_PROP_NAME] = name;
        nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY][RepositoryContentModel.TITLE_PROP_QNAME] = titre;
        nodeBody[RepositoryContentModel.NODE_BODY_PROPERTIES_KEY][RepositoryContentModel.DESC_PROP_QNAME] = desc;

        alfrescoJsApi.nodes.updateNode(nodeId, nodeBody).then(() => {
            console.log('API called successfully changed name.');
        }, function (error) {
            console.error(error);
        });
    }

    lockNode(nodeId, nodeBody) {
        alfrescoJsApi.nodes.lockNode(nodeId, nodeBody).then(() => {
            console.log('API called successfully.');
        }, function (error) {
            console.error(error);
        });
    }

    unlockNode(nodeId) {
        alfrescoJsApi.nodes.unlockNode(nodeId).then(() => {
            console.log('API called successfully.');
        }, function (error) {
            console.error(error);
        });
    }

    moveNode(nodeId, moveBody) {
        alfrescoJsApi.nodes.moveNode(nodeId, moveBody).then(() => {
            console.log('API called successfully.');
        }, function (error) {
            console.error(error);
        });
    }


    searchQuery(queryBody): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                alfrescoJsApi.search.searchApi.search(queryBody).then(data => {
                    resolve(data);
                }, error => {
                    resolve(error)
                });
            }
        );
    }

    // downolodeFile(nodeId) {
    //     return new Promise(
    //         (resolve, reject) => {
    //             alfrescoJsApi.Core.downloadsApi.getDownload(nodeId).then(data => {
    //                 resolve(data);
    //             }, error => {
    //                 resolve(error)
    //             });
    //         }
    //     );
    // }

    GetversionWebScript(): Promise<any> {

        return new Promise(
            (resolve, reject) => {

                alfrescoJsApi.core.webscriptApi.executeWebScript('GET', 'api/dictionary', '', 'alfresco', 's').then(data => {
                    resolve(data);
                    console.log(data);

                }, error => {
                    resolve(error)
                });
            }
        );

    }

    downlodeFile(node) {
        return new Promise(
            (resolve, reject) => {

                alfrescoJsApi.core.nodesApi.getFileContent(node).then(data => {
                    resolve(data);
                    console.log(data);

                }, error => {
                    resolve(error)
                });
            }
        );

    }




    // GetAllWebScript(nodeId,versionId) {
    //
    //     // console.log('api/version')
    //     // this.GetversionWebScript();
    //     // console.log('api/upload')
    //     return new Promise(
    //         (resolve, reject) => {
    //
    //             const formData = new FormData();
    //             formData.append('filedata',file)
    //             let scriptArg = {
    //                 formData,
    //                 'destination': null,
    //                 'uploaddirectory ': '',
    //                 'updateNodeRef': 'workspace://SpacesStore/2f620b7c-1cf7-43df-bda4-6ad282cb4452',
    //                 'description': 'newversion',
    //                 'contenttype': 'cm:content',
    //                 'majorversion': 'false',
    //                 'overwrite': true,
    //                 'thumbnails': null
    //
    //
    //             }
    //     //
    //     //         alfrescoJsApi.core.webscriptApi.executeWebScript('POST', 'api/upload', '','alfresco', 's').then(data => {
    //     //             console.log('data reserved', data)
    //     //             resolve(data);
    //     //
    //     //
    //     //         }, error => {
    //     //             resolve(error)
    //     //         });
    //     //         alfrescoJsApi.core.webscriptApi.executeWebScript('POST', 'api/people', null, 'alfresco', 's').then(data => {
    //     //             console.log('data reserved', data)
    //     //             resolve(data);
    //     //
    //     //
    //     //         }, error => {
    //     //             resolve(error)
    //     //         });
    //     //     }
    //     // );
    //   //  alfrescoJsApi.core.versionsApi.revertVersion(nodeId,versionId,{"majorVersion": true ,"comment": "string"})
    //
    //
    //
    //             alfrescoJsApi.core.webscriptApi.executeWebScript('POST', 'api/upload', '','alfresco', 's').then(data => {
    //                 console.log('data reserved', data)
    //                 resolve(data);
    //
    //
    //             }, error => {
    //                 resolve(error)
    //             });
    //
    //
    // }








}
export class RepositoryContentModel {

    static readonly TITLED_ASPECT_QNAME = 'cm:titled';
    static readonly TITLE_PROP_NAME = 'cm:name';
    static readonly TITLE_PROP_QNAME = 'cm:title';
    static readonly DESC_PROP_QNAME = 'cm:description';
    static readonly AUTHOR_PROP_QNAME = 'cm:author';

    static readonly NODE_BODY_PROPERTIES_KEY = 'properties';
}
