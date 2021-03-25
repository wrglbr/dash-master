<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">{{object.unit_name}} Unit Budget Details</h3>
      </div>
    </div>

    <!-- Default Light Table -->

    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <div class="row">
              <div class="col">
                <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                  <li class="nav-item"><a href="#home" id="home-tab" data-toggle="tab" class="nav-link active" aria-selected="true">Goods & Services</a></li>
                  <li class="nav-item"><a href="#contact" id="contact-tab" data-toggle="tab" class="nav-link" aria-selected="true">Compensations</a></li>
                  <li class="nav-item"><a href="#profile" id="profile-tab" data-toggle="tab" class="nav-link" aria-selected="true">Assets</a></li>
                  <li class="nav-item"><a href="#about" id="about-tab" data-toggle="tab" class="nav-link" aria-selected="true">Allowances</a></li>
                </ul>
              </div>
              <div class="col" v-if="object.status !== 'Completed'" align="right">
                <button data-toggle="modal" data-target="#confirmModal" class="btn btn-sm btn-primary">Complete</button>
              </div>
              <div class="col" align="right" v-else>
                <button @click="exporrt(object.unit)" :disabled="!object" class="btn btn-primary btn-sm">EXTRACT</button>
              </div>
              <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">Budget Summary</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <span class="small text-warning text-center mb-1">Please ensure all inputs are accurate before completing this budget</span>
                      <div class="table-responsive" align="center">
                        <table class="table table-bordered table-sm">
                          <thead>
                          <tr>
                            <th>Items</th>
                            <th>Sub Totals (GHS)</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <th>Compensation of Employees</th>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Established Post</td>
                            <td>{{formatPrice(ep)}}</td>
                          </tr>
                          <tr>
                            <td>Non-Established Post</td>
                            <td>{{formatPrice(nep)}}</td>
                          </tr>
                          <tr>
                            <td>Allowances</td>
                            <td>{{formatPrice(allawa)}}</td>
                          </tr>
                          <tr>
                            <td>Social Security Fund</td>
                            <td>{{formatPrice(ssf)}}</td>
                          </tr>
                          <tr>
                            <td>Gratuity</td>
                            <td>{{formatPrice(gratuity)}}</td>
                          </tr>
                          <tr>
                            <td>Staff Welfare Benefit (Pension Costs)</td>
                            <td>{{formatPrice(pc)}}</td>
                          </tr>
                          <tr>
                            <td>Long Service Awards</td>
                            <td>{{formatPrice(lsa)}}</td>
                          </tr>
                          <tr>
                            <th>Sub Total</th>
                            <th>{{formatPrice(compensate)}}</th>
                          </tr>
                          <tr>
                            <td>Goods and Services Total</td>
                            <th>{{formatPrice(gst)}}</th>
                          </tr>
                          <tr>
                            <td>Asset Total</td>
                            <th>{{formatPrice(at)}}</th>
                          </tr>
                          <!--<tr>-->
                          <!--<td>Allowances</td>-->
                          <!--<td>{{formatPrice(allawa)}}</td>-->
                          <!--</tr>-->
                          <!--<tr>-->
                          <!--<td>Social Security Fund</td>-->
                          <!--<td>{{formatPrice(ssf)}}</td>-->
                          <!--</tr>-->
                          <!--<tr>-->
                          <!--<td>Pension Costs</td>-->
                          <!--<td>{{formatPrice(pc)}}</td>-->
                          <!--</tr>-->
                          <!--<tr>-->
                          <!--<td>Assets</td>-->
                          <!--<td>{{formatPrice(at)}}</td>-->
                          <!--</tr>-->
                          <tr>
                            <th>Total</th>
                            <th>{{formatPrice(tt)}}</th>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button @click="complete()" :disabled="loading" type="button" class="btn btn-primary">Complete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="card-body">
                <!--<div class="row mb-3">-->
                <!--<div class="col"></div>-->
                <!--<div class="col-md-3" align="right">-->
                <!--<div class="row">-->
                <!--<div class="col">-->
                <!--<select name="" id="" v-model="type" class="form-control" @change="exp(object.id)">-->
                <!--<option value="">Export to...</option>-->
                <!--<option value="csv">CSV</option>-->
                <!--<option value="excel">Excel</option>-->
                <!--</select>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <!--<th>Category</th>-->
                      <th>Item</th>
                      <th>Item Type</th>
                      <th>Quantity</th>
                      <th align="center">No. Sub Items</th>
                      <th>Unit Price (GHS)</th>
                      <th>Total Price (GHS)</th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="item.id" v-for="item in object.items">
                      <!--<td>{{item.item.category_name}}</td>-->
                      <td>{{item.item.item_name}}</td>
                      <td>{{item.item.item_type}}</td>
                      <td>
                        <span  v-if="item.item.item_type === 'Good'">
                          <span :id="`qty${item.id}`" v-if="item.quantity" >{{item.quantity}}</span>
                          <span><input type="number" :placeholder="item.quantity" :id="`id_qty${item.id}`" class="form-control" hidden="hidden"></span>
                        </span>
                        <span v-else>N/A</span>

                      </td>
                      <td align="center">{{item.subs.length}}</td>
                      <td>
                        <span v-if="item.item.item_type === 'Good'">
                          <span v-if="item.unit_price" :id="`price${item.id}`">GHS {{formatPrice(item.unit_price)}}</span>
                          <span>
                            <input type="number" :placeholder="formatPrice(item.unit_price)" :id="`id_price${item.id}`" hidden="hidden" class="form-control">
                          </span>
                        </span>

                      </td>
                      <!--<td><span v-if="item.item.item_type === 'Good'"></span>{{item.unit_price}}</td>-->
                      <td>
                        <span v-if="item.item.item_type === 'Good'">GHS {{formatPrice(item.total_amount)}}</span>
                        <span v-else-if="item.item.item_type === 'Service'">
                          <span v-if="item.total_amount" :id="`total${item.id}`">GHS {{formatPrice(item.total_amount)}}</span>
                          <span>
                            <input type="number" :id="`id_total${item.id}`" hidden="hidden" class="form-control">
                          </span>
                        </span>

                      </td>
                      <td>
                        <span v-if="!item.subs.length">
                          <span v-if="item.item.item_type === 'Good'">
                            <button :disabled="object.status === 'Completed'" :id="`id_edit${item.id}`" @click="show_save(item.id)" class="btn btn-sm btn-success"><i class="large material-icons">create</i></button>
                            <button :id="`id_save${item.id}`" :disabled="loading" @click="unit_price(object.id, item.id)" hidden="hidden" class="btn btn-sm btn-primary ml-2"><i class="large material-icons">check</i></button>
                            <button :id="`id_clear${item.id}`" hidden="hidden" @click="hide_save(item.id)" class="btn btn-sm btn-warning ml-2"><i class="large material-icons">clear</i></button>
                          </span>
                          <span v-else-if="item.item.item_type === 'Service'">
                            <button :disabled="object.status === 'Completed'" :id="`id_tedit${item.id}`" @click="t_show_save(item.id)" class="btn btn-sm btn-success"><i class="large material-icons">create</i></button>
                            <button :id="`id_tsave${item.id}`" :disabled="loading" @click="total_price(object.id, item.id)" hidden="hidden" class="btn btn-sm btn-primary ml-2"><i class="large material-icons">check</i></button>
                            <button :id="`id_tclear${item.id}`" hidden="hidden" @click="t_hide_save(item.id)" class="btn btn-sm btn-warning ml-2"><i class="large material-icons">clear</i></button>
                          </span>
                        </span>
                        <span v-else>
                          <button class="btn btn-sm btn-info" :disabled="object.status === 'Completed'" data-toggle="modal" :data-target="`#subs${item.id}`">
                            <i class="fa fa-object-ungroup"></i>
                          </button>
                          <div class="modal fade" :id="`subs${item.id}`" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="staticBackdropLabel">{{item.item.item_name}} Sub Items</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <table class="table">
                                    <thead>
                                      <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Unit Price (GHS)</th>
                                        <th>Total (GHS)</th>
                                        <th>Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr :key="sub.id" v-for="sub in item.subs">
                                        <td>{{sub.sub_item.name}}</td>
                                        <td>
                                          <input type="text" :id="`iq${sub.id}`" disabled v-model="sub.quantity" class="form-control">
                                          <!--{{sub.quantity}}-->
                                        </td>
                                        <td>
                                          <input type="text" :id="`iup${sub.id}`" v-model="sub.unit_price" disabled class="form-control">
                                          <!--{{sub.unit_price}}-->
                                        </td>
                                        <td>{{sub.total_amount}}</td>
                                        <td>
                                          <button class="btn btn-sm btn-success" :id="`ise${sub.id}`" @click="isub_enable(sub.id)">
                                            <i class="material-icons">create</i>
                                          </button>
                                          <button class="btn btn-sm btn-primary ml-1" :id="`iss${sub.id}`" hidden :disabled="loading" @click="isub_save(sub.id, item.id)">
                                            <i class="material-icons">check</i>
                                          </button>
                                          <button class="btn btn-sm btn-warning ml-1" :id="`isc${sub.id}`" @click="isub_disable(sub.id)" hidden>
                                            <i class="material-icons">clear</i>
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                              </div>
                            </div>
                          </div>
                        </span>

                      </td>

                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer" align="right">
                <span class="font-weight-bolder">Sub Total = </span> <span>GHS {{formatPrice(object.goods_services_total)}}</span>
              </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table mb-0">
                    <thead class="bg-light">
                    <tr>
                      <th scope="col" class="border-0">Staff ID</th>
                      <th scope="col" class="border-0">Name</th>
                      <!--<th scope="col" class="border-0">Position</th>-->
                      <th scope="col" class="border-0">Type</th>
                      <th scope="col" class="border-0">Status</th>
                      <th scope="col" class="border-0">Grade</th>
                      <th scope="col" class="border-0">Notch</th>
                      <th scope="col" class="border-0">Monthly Basic (GHS)</th>
                      <th scope="col" class="border-0">Yearly Basic (GHS)</th>

                      <th scope="col" class="border-0">Actions</th>
                    </tr>
                    </thead>
                    <tbody :key="employ.id" v-for="employ in object.employees_compensations">
                    <tr>
                      <td>{{employ.staff_number}}</td>
                      <td>{{employ.first_name}} {{employ.last_name}}</td>
                      <!--<td>{{employ.position}}</td>-->
                      <td>{{employ.employee_type_display}}</td>
                      <td>{{employ.status}}</td>
                      <td>{{employ.rank}}</td>
                      <td>{{employ.notch}}</td>
                      <td>
                        <span v-if="employ.employee_type === 'P'">
                          {{formatPrice(employ.monthly_basic)}}
                        </span>
                        <span v-else>
                          <input type="text" v-model="employ.monthly_basic" :id="`cmb${employ.id}`" disabled class="form-control">
                        </span>

                      </td>
                      <td>
                        <span v-if="employ.employee_type === 'P'">
                          {{formatPrice(employ.period_basic)}}
                        </span>
                        <span v-else-if="employ.employee_type !== 'P'">
                          <input type="text" v-model="employ.period_basic" disabled class="form-control">
                        </span>
                        <span v-else>
                          <input type="text" v-model="employ.period_basic" :id="`cpb${employ.id}`" disabled class="form-control">
                        </span>
                      </td>
                      <td>
                        <span v-if="employ.employee_type !== 'P'">
                          <button class="btn btn-sm btn-success" :disabled="object.status === 'Completed'" :id="`ce${employ.id}`" @click="com_enable(employ.id)">
                            <i class="material-icons">create</i>
                          </button>
                          <button class="btn btn-sm btn-primary ml-1" hidden :id="`cs${employ.id}`" @click="com_save(employ.id)" :disabled="loading">
                            <i class="material-icons">check</i>
                          </button>
                          <button class="btn btn-sm btn-warning ml-1" hidden :id="`cc${employ.id}`" @click="com_disable(employ.id)">
                            <i class="material-icons">clear</i>
                          </button>
                        </span>

                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer" align="right">
                <span class="font-weight-bolder">Sub Total = </span> <span>GHS {{formatPrice(object.consolidated_basic_salary)}}</span>
              </div>

            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="card-body">
                <div class="list-group" :key="asset.id" v-for="asset in object.assets">
                  <div class="list-group-item" v-if="asset.is_selected">
                    <div class="row">
                      <!--<div class="col-md-1">-->
                      <!--<input class="form-check-input" disabled type="checkbox" :checked="asset.is_selected" value="" id="defaultCheck1">-->
                      <!--</div>-->
                      <div class="col-md-7">{{asset.asset.asset_name}}</div>
                      <div class="col-md-5" align="right">
                        <d-row>
                          <div class="col-md-7">
                            <span v-if="asset.amount" :id="`amount${asset.id}`">GHS {{formatPrice(asset.amount)}}</span>
                            <input type="number" :id="`id_asset${asset.id}`" hidden="hidden" class="form-control">
                          </div>
                          <div class="col-md-5">
                            <span v-if="!asset.subs.length">
                              <button :disabled="object.status === 'Completed' || !asset.is_selected" :id="`id_asset_edit${asset.id}`" @click="a_show_save(asset.id)" class="btn mr-1 small btn-sm btn-success"><span class="material-icons small">create</span></button>
                              <button :id="`id_asset_save${asset.id}`" hidden="hidden" @click="asset_amount(object.id, asset.id)" :disabled="loading" class="btn mr-1 small btn-sm btn-primary"><span class="material-icons small">check</span></button>
                              <button :id="`id_asset_clear${asset.id}`" hidden="hidden" @click="a_hide_save(asset.id)" class="btn small btn-sm btn-warning"><span class="material-icons small">clear</span></button>
                            </span>
                            <span v-else>
                              <a :href="`#assCol${asset.id}`" :disabled="object.status === 'Completed'" aria-expanded="false" :aria-controls="`assCol${asset.id}`" data-toggle="collapse" role="button" class="mr-1 btn btn-sm btn-info"><i class="fa fa-sort"></i></a>
                            </span>
                          </div>
                        </d-row>
                      </div>
                    </div>
                  </div>
                  <div class="collapse multi-collapse" :id="`assCol${asset.id}`">
                    <table class="table pt-2">
                      <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Quantity</th>
                        <th>Unit Price GHS</th>
                        <th>Total GHS</th>
                        <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr :key="sub.id" v-for="sub in asset.subs">
                        <td>{{sub.sub_asset.name}}</td>
                        <td>
                          <input type="number" :id="`aq${sub.id}`" v-model="sub.quantity" disabled class="form-control">
                          <!--{{sub.quantity}}-->
                        </td>
                        <td>
                          <input type="number" :id="`aup${sub.id}`" v-model="sub.unit_price" disabled class="form-control">
                          <!--{{sub.unit_price}}-->
                        </td>
                        <td>{{formatPrice(sub.total_amount)}}</td>
                        <td>
                          <button class="btn btn-sm btn-success" :disabled="object.status === 'Completed'" :id="`ase${sub.id}`" @click="esub_enable(sub.id)">
                            <i class="material-icons">create</i>
                          </button>
                          <button class="btn btn-sm btn-primary ml-1" :id="`ass${sub.id}`" hidden :disabled="loading" @click="esub_save(sub.id, asset.id)">
                            <i class="material-icons">check</i>
                          </button>
                          <button class="btn btn-sm btn-warning ml-1" :id="`asc${sub.id}`" hidden @click="esub_disable(sub.id)">
                            <i class="material-icons">clear</i>
                          </button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="card-footer" align="right">
                <span class="font-weight-bolder">Sub Total = </span> <span>GHS {{formatPrice(object.asset_total)}}</span>
              </div>
            </div>
            <div class="tab-pane fade" id="about" role="tabpanel" aria-labelledby="about-tab">
              <div class="card-body" v-if="object.status !== 'Completed'">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="mma">Motorbike Maintenance Allowance</label>
                      <input type="number" id="mma" v-model="object.motor_maintenance" class="form-control">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="bma">Bicycle Maintenance Allowance</label>
                      <input type="number" id="bma" v-model="object.bic_maintenance" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="ta">Training Allowance</label>
                      <input type="number" id="ta" v-model="object.training_allowance" class="form-control">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="aa">Acting Allowance</label>
                      <input type="number" id="aa" v-model="object.acting_allowance" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="ds">Driver Subsidy</label>
                      <input type="number" id="ds" v-model="object.driver_allowance" class="form-control">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="ea">Entertainment Allowance</label>
                      <input type="number" id="ea" v-model="object.entertain_allowance" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="dga">Disability Guide Allowance</label>
                      <input type="number" id="dga" v-model="object.disability_allowance" class="form-control">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="oa">Overtime Allowance</label>
                      <input type="number" id="oa" v-model="object.overtime_allowance" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="tsa">Tools Allowance</label>
                      <input type="number" id="tsa" v-model="object.tools_allowance" class="form-control">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="ua">Utility Allowance</label>
                      <input type="number" id="ua" v-model="object.utility_allowance" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="ca">Cashier Allowance</label>
                      <input type="number" id="ca" v-model="object.cashier_allowance" class="form-control">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="lsa">Long Service Awards</label>
                      <input type="number" id="lsa" v-model="object.long_service_awards" class="form-control">
                    </div>
                  </div>
                </div>
                <button class="btn-block btn btn-sm btn-info" :disabled="loading || object.status === 'Completed'" @click="allowances(object.id)">Save</button>
              </div>
              <div class="card-body" v-else>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>Items</th>
                      <th>Amount GHS</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Motorbike Maintenance Allowance</td>
                      <td>{{formatPrice(object.motor_maintenance)}}</td>
                    </tr>
                    <tr>
                      <td>Bicycle Maintenance Allowance</td>
                      <td>{{formatPrice(object.bic_maintenance)}}</td>
                    </tr>
                    <tr>
                      <td>Car Maintenance Allowance</td>
                      <td>{{formatPrice(object.car_maintenance_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Training Allowance</td>
                      <td>{{formatPrice(object.training_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Duty Allowance</td>
                      <td>{{formatPrice(object.duty_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Professional Allowance</td>
                      <td>{{formatPrice(object.professional_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Acting Allowance</td>
                      <td>{{formatPrice(object.acting_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Entertainment Allowance</td>
                      <td>{{formatPrice(object.entertain_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Fuel Allowance</td>
                      <td>{{formatPrice(object.fuel_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Disability Guide Allowance</td>
                      <td>{{formatPrice(object.disability_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Housing Allowance</td>
                      <td>{{formatPrice(object.rent_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Risk Allowance</td>
                      <td>{{formatPrice(object.risk_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Overtime Allowance</td>
                      <td>{{formatPrice(object.overtime_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Tools Allowance</td>
                      <td>{{formatPrice(object.tools_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Housing Allowance</td>
                      <td>{{formatPrice(object.rent_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Travel & Transport Allowance</td>
                      <td>{{formatPrice(object.transport_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Domestic Servant Allowance</td>
                      <td>{{formatPrice(object.house_help_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Garden Boy Allowance</td>
                      <td>{{formatPrice(object.garden_boy_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Day Watchman Allowance</td>
                      <td>{{formatPrice(object.watchman_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Utility Allowance</td>
                      <td>{{formatPrice(object.utility_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Responsibility Allowance</td>
                      <td>{{formatPrice(object.responsibility_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Clothing Allowance</td>
                      <td>{{formatPrice(object.clothing_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Cashier Allowance</td>
                      <td>{{formatPrice(object.cashier_allowance)}}</td>
                    </tr>
                    <tr>
                      <td>Bonus</td>
                      <td>{{formatPrice(object.annual_bonus)}}</td>
                    </tr>
                    <tr>
                      <th>Total Allowance</th>
                      <th>{{formatPrice(object.allowances)}}</th>
                    </tr>
                    <tr>
                      <th>Social Contributions</th>
                      <td></td>
                    </tr>
                    <tr>
                      <td>13% SSF Contributions</td>
                      <td>{{formatPrice(object.social_security_fund)}}</td>
                    </tr>
                    <tr>
                      <td>Gratuity</td>
                      <td>{{formatPrice(object.gratuity)}}</td>
                    </tr>
                    <tr>
                      <td>Staff Welfare Benefit</td>
                      <td>{{formatPrice(object.pension_costs)}}</td>
                    </tr>
                    <tr>
                      <td>Long Service Awards</td>
                      <td>{{formatPrice(object.long_service_awards)}}</td>
                    </tr>
                    <tr>
                      <th>Sub Total</th>
                      <th>{{formatPrice(sct)}}</th>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer" align="right">
                <span class="font-weight-bolder">Sub Total = </span> <span>GHS {{formatPrice(scat)}}</span>
              </div>
            </div>
          </div>
          <div class="card-footer" >
            <div class="row">
              <div class="col">
                <span class="badge badge-primary mr-2">{{object.status}}</span>
                <!--<router-link to="#" class="btn-sm btn btn-warning">Compensation Summary</router-link>-->
              </div>
              <div class="col" align="right">
                <span class="font-weight-bolder">Total = </span> <span>GHS {{formatPrice(object.total_budget)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import axios from 'axios';
  import config from '@/config';
  import Spinner from '@/components/common/Spinner.vue';

  export default {
    components: {
      Spinner,
    },
    data() {
      return {
        object: {},
        type: '',
        loading: false,
        pageloading: false,
        gst: 0,
        cb: 0,
        allawa: 0,
        ssf: 0,
        pc: 0,
        at: 0,
        tt: 0,
        nep: 0,
        ep: 0,
        temp: 0,
        pt: 0,
        nabco: 0,
        gratuity: 0,
        lsa: 0,
        compensate: 0,
        // unit_price: '',
      };
    },
    computed:{
      sct(){
        const sum = Number(this.object.social_security_fund) + Number(this.object.gratuity) + Number(this.object.pension_costs) + Number(this.object.long_service_awards);
        return sum;
      },
      scat(){
        return Number(this.object.allowances) + this.sct;
      }
    },
    methods: {
      isub_enable(subid){
        document.getElementById(`iq${subid}`).disabled = false;
        document.getElementById(`iup${subid}`).disabled = false;
        document.getElementById(`ise${subid}`).hidden = true;
        document.getElementById(`iss${subid}`).hidden = false;
        document.getElementById(`isc${subid}`).hidden = false;
      },
      isub_disable(subid){
        document.getElementById(`iq${subid}`).disabled = true;
        document.getElementById(`iup${subid}`).disabled = true;
        document.getElementById(`ise${subid}`).hidden = false;
        document.getElementById(`iss${subid}`).hidden = true;
        document.getElementById(`isc${subid}`).hidden = true;
      },
      isub_save(subid, ib){
        const quantity = document.getElementById(`iq${subid}`).value;
        const price = document.getElementById(`iup${subid}`).value;
        if(quantity && price > 0){
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/bsip/${ib}/${subid}/`, {
            quantity: quantity,
            price: price,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            }
          }).then((response) => {
            this.loading = false;
            console.log(response);
            this.$noty.success('Sub Item Price recorded');
            this.isub_disable(subid);
            this.details();
          }).catch(({response}) => {
            this.loading = false;
            console.log(response);
            const errors = response.data;
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${errors.detail}`);
            }
          })
        }
      },
      com_enable(eid){
        document.getElementById(`cmb${eid}`).disabled = false;
        if(document.getElementById(`cpb${eid}`) !== null){
          document.getElementById(`cpb${eid}`).disabled = false;
        }
        document.getElementById(`ce${eid}`).hidden = true;
        document.getElementById(`cs${eid}`).hidden = false;
        document.getElementById(`cc${eid}`).hidden = false;
      },
      com_disable(eid){
        document.getElementById(`cmb${eid}`).disabled = true;
        if(document.getElementById(`cpb${eid}`) !== null){
          document.getElementById(`cpb${eid}`).disabled = true;
        }
        document.getElementById(`ce${eid}`).hidden = false;
        document.getElementById(`cs${eid}`).hidden = true;
        document.getElementById(`cc${eid}`).hidden = true;
      },
      com_save(eid){
        const monthly = document.getElementById(`cmb${eid}`).value;
        var yearly;
        if(document.getElementById(`cpb${eid}`) !== null){
          yearly = document.getElementById(`cpb${eid}`).value;
        }
        if(monthly > 0 && (yearly > 0 || document.getElementById(`cpb${eid}`) === null)){
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/bcs/${eid}/`, {
            monthly: monthly,
            yearly: yearly
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            }
          }).then((response) => {
            this.loading = false;
            console.log(response);
            this.$noty.success('Compensation recorded');
            this.com_disable(eid);
            this.details();
          }).catch(({response}) => {
            this.loading = false;
            console.log(response);
            const errors = response.data;
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${errors.detail}`);
            }
          })
        }
      },
      esub_enable(aid){
        document.getElementById(`aq${aid}`).disabled = false;
        document.getElementById(`aup${aid}`).disabled = false;
        document.getElementById(`ase${aid}`).hidden = true;
        document.getElementById(`ass${aid}`).hidden = false;
        document.getElementById(`asc${aid}`).hidden = false;
      },
      esub_disable(aid){
        document.getElementById(`aq${aid}`).disabled = true;
        document.getElementById(`aup${aid}`).disabled = true;
        document.getElementById(`ase${aid}`).hidden = false;
        document.getElementById(`ass${aid}`).hidden = true;
        document.getElementById(`asc${aid}`).hidden = true;
      },
      esub_save(aid, ab){
        const quantity = document.getElementById(`aq${aid}`).value;
        const price = document.getElementById(`aup${aid}`).value;
        if(quantity && price > 0){
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/bsap/${ab}/${aid}/`, {
            quantity: quantity,
            price: price,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            }
          }).then((response) => {
            this.loading = false;
            console.log(response);
            this.$noty.success('Sub asset price recorded');
            this.esub_disable(aid);
            this.details();
          }).catch(({response}) => {
            this.loading = false;
            console.log(response);
            const errors = response.data;
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${errors.detail}`);
            }
          })
        }
      },
      allowances(uid){
        this.loading = true;
        axios.post(`${config.apiUrl}/budget/ba/${uid}/`, {
          mm: this.object.motor_maintenance,
          aa: this.object.acting_allowance,
          bm: this.object.bic_maintenance,
          ta: this.object.training_allowance,
          da: this.object.driver_allowance,
          ea: this.object.entertain_allowance,
          dda: this.object.disability_allowance,
          oa: this.object.overtime_allowance,
          tta: this.object.tools_allowance,
          ua: this.object.utility_allowance,
          ca: this.object.cashier_allowance,
          lsa: this.object.long_service_awards
        }, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((response) => {
          this.loading = false;
          console.log(response);
          this.$noty.success('Allowances recorded');
          this.details();
        }).catch(({response}) => {
          this.loading = false;
          console.log(response);
          const errors = response.data;
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${errors.detail}`);
          }
        })
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.');
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      totals(){
        this.ssf = this.object.social_security_fund;
        this.pc = this.object.pension_costs;
        this.cb = this.object.consolidated_basic_salary;
        this.allawa = this.object.allowances;
        this.object.items.forEach(item => {
          console.log(item.total_amount);
          this.gst = this.gst + Number(item.total_amount);
        });

        this.object.assets.forEach(asset => {
          this.at = this.at + Number(asset.amount);
        });

        console.log(this.gst);
        this.tt = this.gst + this.at + Number(this.cb) + Number(this.allawa) + Number(this.ssf) + Number(this.pc);
      },
      details() {
        this.pageloading = true;
        const budgetid = this.$route.params.unit_id;
        axios.get(`${config.apiUrl}/budget/ubd/${budgetid}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((response) => {
          this.pageloading = false;
          const results = response.data;
          this.object = results.object;
          this.gst = results.goods_services_total;
          this.at = results.asset_total;
          this.nep = results.non_mgt;
          this.ep = results.mgt;
          this.temp = results.temporary;
          this.contract = results.contract;
          this.pt = results.part_time;
          this.nabco = results.nabco;
          this.ssf = results.ssf;
          this.gratuity = results.gratuity;
          this.pc = results.pension_cost;
          this.lsa = results.lsa;
          this.allawa = results.allowances;
          this.compensate = results.compensate;
          this.tt = results.budget_total;
          console.log(response.data);
          this.$noty.success('Everything looks great');
        }).catch(({response}) => {
          this.pageloading = false;
          console.log(response);
          const errors = response.data;
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${errors.detail}`);
          }
        });
      },
      show_save(id) {
        document.getElementById(`id_save${id}`).hidden = false;
        document.getElementById(`id_clear${id}`).hidden = false;
        document.getElementById(`id_edit${id}`).hidden = true;
        document.getElementById(`id_price${id}`).hidden = false;
        document.getElementById(`qty${id}`).hidden = true;
        document.getElementById(`id_qty${id}`).hidden = false;
        document.getElementById(`price${id}`).hidden = true;
      },
      hide_save(id) {
        document.getElementById(`id_save${id}`).hidden = true;
        document.getElementById(`id_clear${id}`).hidden = true;
        document.getElementById(`id_edit${id}`).hidden = false;
        document.getElementById(`id_price${id}`).hidden = true;
        document.getElementById(`qty${id}`).hidden = false;
        document.getElementById(`id_qty${id}`).hidden = true;
        document.getElementById(`price${id}`).hidden = false;
      },
      t_show_save(id) {
        document.getElementById(`id_tsave${id}`).hidden = false;
        document.getElementById(`id_tclear${id}`).hidden = false;
        document.getElementById(`id_tedit${id}`).hidden = true;
        document.getElementById(`id_total${id}`).hidden = false;
        document.getElementById(`total${id}`).hidden = true;
      },
      t_hide_save(id) {
        document.getElementById(`id_tsave${id}`).hidden = true;
        document.getElementById(`id_tclear${id}`).hidden = true;
        document.getElementById(`id_tedit${id}`).hidden = false;
        document.getElementById(`id_total${id}`).hidden = true;
        document.getElementById(`total${id}`).hidden = false;
      },
      a_show_save(id) {
        document.getElementById(`id_asset_save${id}`).hidden = false;
        document.getElementById(`id_asset_clear${id}`).hidden = false;
        document.getElementById(`id_asset_edit${id}`).hidden = true;
        document.getElementById(`id_asset${id}`).hidden = false;
        document.getElementById(`amount${id}`).hidden = true;
      },
      a_hide_save(id) {
        document.getElementById(`id_asset_save${id}`).hidden = true;
        document.getElementById(`id_asset_clear${id}`).hidden = true;
        document.getElementById(`id_asset_edit${id}`).hidden = false;
        document.getElementById(`id_asset${id}`).hidden = true;
        document.getElementById(`amount${id}`).hidden = false;
      },
      unit_price(unitBudgetId, itemId) {
        // console.log(unitBudgetId);
        // console.log(itemId);
        let price = document.getElementById(`id_price${itemId}`).value;
        let quantity = document.getElementById(`id_qty${itemId}`).value;
        if (price) {
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/bip/${unitBudgetId}/${itemId}/`, {
            price: price,
            quantity: quantity,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            price = '';
            quantity = '';
            console.log(res);
            document.getElementById(`id_save${itemId}`).hidden = true;
            document.getElementById(`id_edit${itemId}`).hidden = false;
            document.getElementById(`id_price${itemId}`).hidden = true;
            document.getElementById(`id_qty${itemId}`).hidden = true;
            document.getElementById(`id_clear${itemId}`).hidden = true;
            document.getElementById(`price${itemId}`).hidden = false;
            document.getElementById(`qty${itemId}`).hidden = false;
            this.details();
            this.$noty.success('Amount recorded');
          }).catch(({response}) => {
            this.loading = false;
            console.log(response);
            this.details();
            const error = response.data;
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${error.detail}`);
            }
          });
        }
      },
      total_price(unitBudgetId, itemId) {
        // console.log(unitBudgetId);
        // console.log(itemId);
        const price = document.getElementById(`id_total${itemId}`).value;
        if (price) {
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/bip/${unitBudgetId}/${itemId}/`, {
            price,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            document.getElementById(`id_tsave${itemId}`).hidden = true;
            document.getElementById(`id_tedit${itemId}`).hidden = false;
            document.getElementById(`id_total${itemId}`).hidden = true;
            document.getElementById(`id_tclear${itemId}`).hidden = true;
            document.getElementById(`total${itemId}`).hidden = false;
            this.details();
            this.$noty.success('Amount recorded');
          }).catch(({res}) => {
            this.loading = false;
            console.log(res);
            const errors = res.data;
            if(res.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${errors.detail}`);
            }
            this.details();

          });
        }
      },
      asset_amount(unitBudgetId, assetId) {
        // console.log(unitBudgetId);
        // console.log(itemId);
        const price = document.getElementById(`id_asset${assetId}`).value;
        if (price) {
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/baa/${unitBudgetId}/${assetId}/`, {
            amount: price,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((res) => {
            this.loading = false;
            console.log(res);
            document.getElementById(`id_asset_save${assetId}`).hidden = true;
            document.getElementById(`id_asset_edit${assetId}`).hidden = false;
            document.getElementById(`id_asset${assetId}`).hidden = true;
            document.getElementById(`id_asset_clear${assetId}`).hidden = true;
            document.getElementById(`amount${assetId}`).hidden = false;
            this.details();
            this.$noty.success('Amount recorded');
          }).catch(({res}) => {
            this.loading = false;
            console.log(res);
            const errors = res.data;
            if(res.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${errors.detail}`);
            }
            this.details();
          });
        }
      },
      exp(unitBudgetId) {
        axios.get(`${config.apiUrl}/budget/eb/${unitBudgetId}/${this.type}/`, {
          responseType: 'blob',
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          // console.log(res);
          if (this.type === 'excel') {
            const url = URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.object.unit_name}`);
            document.body.appendChild(link);
            link.click();
          } else {
            const url = URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.object.unit_name}.csv`);
            document.body.appendChild(link);
            link.click();
          }
        }).catch((res) => {
          console.log(res);
        });
      },
      exporrt(uid){
        this.$noty.info('Extracting...');
        axios.get(`${config.apiUrl}/budget/exub/${uid}/`, {
          responseType: 'blob',
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          }
        }).then((res) => {
          const url = URL.createObjectURL(new Blob([res.data], {type: 'application/vnd.ms-excel'}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.object.unit_name}.xls`);
          document.body.appendChild(link);
          link.click();
          this.noty.success('Extracted successfully');
        }).catch(({res}) => {
          console.log(res);
          const errors = res.data;
          if(res.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${errors.detail}`);
          }
        })
      },
      complete() {
        this.loading = true;
        const slug = this.$route.params.unit_id;
        axios.post(`${config.apiUrl}/budget/ubd/${slug}/`, {}, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((res) => {
          this.loading = false;
          console.log(res);
          this.details();
          this.$noty.success('Unit budget completed successfully');
          $('#confirmModal').modal('hide');
        }).catch(({res}) => {
          this.loading = false;
          console.log(res);
          const errors = res.data;
          if(res.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            $('#confirmModal').modal('hide');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${errors.detail}`);
          }
        });
      },

    },
    mounted() {
      this.details();
    },
    watch: {
      object() {
        // this.totals();
        // edit_btn = document.getElementById('id_edit');
      },
    },
  };
</script>

