<!--begin::Suggestions-->
                            <div data-kt-search-element="suggestions">
                                <!--begin::Heading-->
                                <h3 class="fw-semibold mb-5">les membres:</h3>
                                <!--end::Heading-->

                                <!--begin::Users-->
                                <div class="mh-375px scroll-y me-n7 pe-7" *ngFor="let developpeur of ListDeveloppeurs">
                                    <!--begin::User-->
                                    <a href="#"
                                        class="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1">
                                        <!--begin::Avatar-->
                                        <!--<div class="symbol symbol-35px symbol-circle me-5">
                                            {{developpeur.img}}
                                        </div>-->
                                        <!--end::Avatar-->

                                        <!--begin::Info-->
                                        <div class="fw-semibold">
                                           
                                            <span class="fs-6 text-gray-800 me-2" >{{developpeur.nom}} {{developpeur.prenom}}</span>
                                            <span class="badge badge-light">{{developpeur.email}}</span>
                                           
                                        </div>
                                        <!--end::Info-->
                                    </a>
                                    <!--end::User-->
                                    <!--begin::User-->
                                  
                                    <!--end::User-->
                                </div>
                                <!--end::Users-->
                            </div>
                            <!--end::Suggestions-->