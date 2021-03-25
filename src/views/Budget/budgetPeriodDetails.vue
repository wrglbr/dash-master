<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">{{object.period}} Budget Details</h3>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <div class="card bg-warning text-white">
          <div class="card-header">
            <div class="row">
              <div class="col" style="border-right: 2px solid black">
                <div class="row">
                  <div class="col">Start Date</div>
                  <div class="col">{{object.start_date}}</div>
                </div>
              </div>
              <div class="col" style="border-right: 2px solid black">
                <div class="row">
                  <div class="col">End Date</div>
                  <div class="col">{{object.end_date}}</div>
                </div>
              </div>
              <div class="col" style="border-right: 2px solid black">
                <div class="row">
                  <div class="col">Deadline</div>
                  <div class="col">{{object.deadline}}</div>
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="col">Status</div>
                  <div class="col">{{object.status}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
    <!-- Default Light Table -->
    <center v-if="pageloading"><Spinner/></center>
    <div  class="row" v-else>
      <div class="modal fade" id="confirmModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <!--<div class="modal-header">-->
            <!--<h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>-->
            <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
            <!--<span aria-hidden="true">&times;</span>-->
            <!--</button>-->
            <!--</div>-->
            <div class="modal-body">
              <i class="fa fa-spinner fa-spin" style="font-size:24px; color: crimson"></i> Please wait whiles your budget is being confirmed. This may take a minute or more
            </div>
            <!--<div class="modal-footer">-->
            <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
            <!--<button type="button" class="btn btn-primary">Understood</button>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="modal fade" id="completeModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Complete Budget Period?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Clicking on the understood button implies that all unit budgets have been computed, reports assessed, completed and ready to be procured
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" :disabled="loading" @click="complete_period(object.id)">Understood</button>
            </div>
          </div>
        </div>
      </div>
      <!--{{unit_budget.status}}-->
      <div class="col-md-12">
        <div class="card" v-if="userRole === 'BH' || userRole === 'BO'">
          <div class="card-header">
            <div class="row">
              <div class="col">Units Budgets</div>
              <div class="col" align="right" v-if="userRole === 'BH'">
                <button @click="open_period(object.id)" title="Click to open this budget period for submissions" :disabled="loading" class="btn btn-sm btn-success" v-if="object.status === 'Close'">Open</button>
                <button class="btn btn-sm btn-warning" title="Click to close this budget period" :disabled="loading" @click="close_period(object.id)" :hidden="object.status === 'Completed'" v-else >Close</button>
                <button class="btn btn-sm btn-success ml-1" title="Click to complete this budget period"  data-toggle="modal" data-target="#completeModal" :hidden="unit_budgets.length === 0 || object.status === 'Completed'">Complete</button>
                <!--{{unit_budgets.length}}-->
              </div>
            </div>
          </div>
          <div class="card-body ">
            <div v-if="unit_budgets.length">
              <div class="list-group-flush">
                <div  :key="unit.id" v-for="unit in unit_budgets" class="list-group-item bg-white text-black list-group-item-action flex-column align-items-start">
                  <div class="row">
                    <div class="col-md-10">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{unit.unit_name}}</h5>
                        <!-- <small class="text-muted">3 days ago</small> -->
                      </div>
                      <p class="mb-1 text-black">{{unit.status}}</p>
                    </div>
                    <div class="col-md-2 mt-2">
                      <router-link :to="{name: 'unitBudget-details', params: {unit_id: unit.slug}}" class="btn btn-primary btn-sm">View</router-link>
                    </div>
                  </div>

                  <!-- <small class="text-muted">Donec id elit non mi porta.</small> -->
                </div>
              </div>
            </div>
            <div v-else>
              No unit budgets yet!
            </div>
          </div>
        </div>
        <div class="card" v-if="userRole === 'UU' && unit_budget.status === 'Pending' || unit_budget.status === 'Confirmed' && object.status !== 'Deadline'">
          <div class="card-header">
            <div class="row">
              <div class="col-md-6">{{unit_budget.unit_name}} Unit Budget </div>
              <div class="col-md-6" align="right" v-if="unit_budget.status !== 'Confirmed'">
                <button @click="confirm_budget(unit_budget.id)" id="id_confirm" :disabled="!unit_budget.items.length || !unit_budget.assets.length" class="btn btn-icon btn-xs btn-success" title="Confirm your selections">
                  <span v-if="!loading">Confirm</span><span v-else>Confirming...</span>
                </button>
              </div>

            </div>
          </div>
          <div class="card-body">
            <ul class="nav nav-tabs" id="myTabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="home1-tab" @click="clear()" data-toggle="tab" href="#home1" role="tab" aria-controls="home1" aria-selected="true">Goods and Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="profile1-tab" @click="clear()" data-toggle="tab" href="#profile1" role="tab" aria-controls="profile1" aria-selected="false">Compensations</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="contact1-tab" @click="clear()" data-toggle="tab" href="#contact1" role="tab" aria-controls="contact1" aria-selected="false">Assets</a>
              </li>
              <!--<li class="nav-item">-->
              <!--<a class="nav-link" id="about1-tab" data-toggle="tab" href="#about1" role="tab" aria-controls="about1" aria-selected="false">Imprest</a>-->
              <!--</li>-->
            </ul>
            <div class="tab-content" id="myTabsContent">
              <div class="tab-pane fade show active mt-2" id="home1" role="tabpanel" aria-labelledby="home1-tab">
                <div class="row">
                  <div class="col-md-6">
                    <i class="text-black-50 small">Items: </i><span :key="item.id" v-for="item in unit_budget.items" style="margin-right:5px">
                      <span class="badge badge-primary" :title="`${item.item.category_name}`" >{{item.item.item_name}} <span v-if="item.item.item_type === 'Service'">(GHS {{formatPrice(item.total_amount)}})</span><span v-else-if="item.subs.length > 0"></span><span v-else>({{item.quantity}})</span> <span class="material-icons small" style="cursor: pointer" @click="remove_budget_item(unit_budget.id, item.item.id)" >clear</span></span>
                    </span>
                  </div>
                  <div class="col-md-6">
                    <i class="text-black-50 small">Subs: </i>
                    <span :key="item.id" v-for="item in unit_budget.items" >

                      <span :key="sub.id" v-for="sub in item.subs" style="margin-right: 5px;">
                        <span class="badge badge-info" :title="sub.item_name">{{sub.sub_item.name}} ({{sub.quantity}}) <span @click="remove_budget_sub('gs', sub.id)" class="material-icons small" style="cursor: pointer">clear</span></span>
                      </span>
                    </span>
                  </div>
                </div>
                <hr>
                <div class="mb-2">Add More?</div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="errors text-danger small" v-if="errors">
                      {{errors.detail}}
                    </div>
                    <div class="form-group">
                      <label>Category</label>
                      <select name="category" v-model="category" id="id_category" class="custom-select">
                        <option value="">Select Category</option>
                        <option v-for="category in categories" :key="category.id" :value="`${category.id}`" >{{category.name}}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Items</label>
                      <select name="item" v-model="item" id="id_item" class="custom-select">
                        <option value="">Select Item</option>
                        <option v-for="item in items" :key="item.id" :value="`${item.id}`">{{item.item_name}}</option>
                      </select>
                    </div>
                    <div class="form-group" :hidden="!sub_items.length">
                      <label>Sub Items</label>
                      <select name="sub" id="sub" v-model="sub_item" class="custom-select">
                        <option value="">Select Sub Item</option>
                        <option :key="sub.id" v-for="sub in sub_items" :value="`${sub.id}`">{{sub.name}}</option>
                      </select>
                    </div>
                    <div class="form-group" :hidden="item_obj.item_type === 'Service'">
                      <label>Quantity</label>
                      <input type="number" name="quantity" v-model="quantity" class="form-control">
                    </div>
                    <div class="form-group" :hidden="item_obj.item_type === 'Good' || sub_items.length > 0">
                      <label>Amount</label>
                      <input type="number" name="amount" :disabled="item_obj.item_type === 'Good' || item === ''" v-model="amount" class="form-control">
                    </div>
                    <div class="form-group">
                      <button :disabled="formLoading" @click="`${new_budget_item(unit_budget.id)}`" type="submit" class="btn btn-sm btn-block btn-info"><span v-if="formLoading">Saving...</span><span v-else>Submit</span></button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade mt-2" id="profile1" role="tabpanel" aria-labelledby="profile1-tab">
                <div class="row">
                  <div class="col-md-12">
                        <span :key="salary.id" v-for="salary in unit_budget.employees_compensations" style="margin-right:5px">
                            <span class="badge badge-primary" :title="`GHS ${formatPrice(salary.period_basic)}`" >{{salary.first_name}} {{salary.last_name}} <span v-if="salary.employee_type === 'P'">(GHS {{formatPrice(salary.monthly_basic)}})</span><span v-else>({{salary.employee_type_display}})</span> <span @click="remove_budget_com(unit_budget.id, salary.id)" class="material-icons small" style="cursor: pointer">clear</span></span>
                        </span>
                  </div>
                </div>
                <hr>
                <div class="mb-2">Add More?</div>
                <div class="errors text-danger small" v-if="errors">
                  {{errors.detail}}
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_snb1">Staff Number</label>
                      <input type="text" id="id_snb1" v-model="number" class="form-control" placeholder="Staff Number">
                    </div>
                  </div>
                  <!--<div class="col">-->
                  <!--<div class="form-group">-->
                  <!--<label for="id_p1">Postion</label>-->
                  <!--<select v-model="position" id="id_p1" class="custom-select">-->
                  <!--<option value="">Choose...</option>-->
                  <!--<option value="Office Manager">Office Manager</option>-->
                  <!--<option value="Accounts Officer">Accounts Officer</option>-->
                  <!--<option value="Tax Audit">Tax Audit</option>-->
                  <!--<option value="Secretary">Secretary</option>-->
                  <!--</select>-->
                  <!--&lt;!&ndash;<input type="text" id="id_p1" v-model="number" class="form-control" placeholder="Pos">&ndash;&gt;-->
                  <!--</div>-->
                  <!--</div>-->
                </div>

                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_fn1">First Name</label>
                      <input type="text" id="id_fn1" class="form-control" v-model="fname" placeholder="First Name">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="id_ln1">Last Name</label>
                      <input type="text" id="id_ln1" class="form-control" v-model="lname" placeholder="Last Name">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_type1">Employee Type</label>
                      <select v-model="em_type1" id="id_type1" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="P">Permanent Staff</option>
                        <option value="C">Contract Staff</option>
                        <option value="T">Temporary Staff</option>
                        <option value="PT">Part-Time Staff</option>
                        <option value="N">Nabco Intern</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="id_status1">Staff Status</label>
                      <select v-model="status" id="id_status1" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="At Post">At Post</option>
                        <option value="On Leave">On Leave</option>
                        <option value="On Paid Leave">On Paid Leave</option>
                        <option value="About to Retire">About to Retire</option>
                        <option value="Interdiction">Interdiction</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row" id="id_rn1" hidden="hidden">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_rank1">Rank</label>
                      <select id="id_rank1" v-model="rank1" class="c_rank form-control">
                        <option value="">Choose...</option>
                        <option value="CG">CG</option>
                        <option value="COMM">COMM</option>
                        <option value="DC">DC</option>
                        <option value="AC">AC</option>
                        <option value="CRO">CRO</option>
                        <option value="PRO">PRO</option>
                        <option value="SRO">SRO</option>
                        <option value="RO">RO</option>
                        <option value="ARO I">ARO I</option>
                        <option value="ARO II">ARO II</option>
                        <option value="RA I">RA I</option>
                        <option value="RA II">RA II</option>
                        <option value="RA III">RA III</option>
                        <option value="JRA I">JRA I</option>
                        <option value="JRA II">JRA II</option>
                        <option value="JRA III">JRA III</option>
                        <option value="JRA IV">JRA IV</option>
                        <option value="JRA V">JRA V</option>
                        <option value="JRA VI">JRA VI</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="id_notch1">Notch</label>
                      <select id="id_notch1" v-model="notch1" class="c_notch form-control">
                        <option value="">Choose...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row" id="id_my1" hidden="hidden">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_basic1">Monthly Basic Salary</label>
                      <input type="text" disabled class="form-control c_basic" id="id_basic1">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="id_period1">{{object.period}} Basic Salary</label>
                      <input type="text" disabled class="form-control c_period" id="id_period1">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <button :disabled="formLoading" id="submit1" @click="new_budget_com(unit_budget.id)" class="btn btn-sm btn-primary btn-block">Submit</button>
                </div>
              </div>
              <div class="tab-pane fade mt-2" id="contact1" role="tabpanel" aria-labelledby="contact1-tab">
                <div class="row">
                  <div class="col-md-6">
                    <i class="text-black-50 small">Assets: </i> <span :key="asset.id" v-for="asset in unit_budget.assets" style="margin-right:5px">
                      <span v-if="asset.is_selected" class="badge badge-primary">{{asset.asset.asset_name}} <span @click="remove_budget_asset(unit_budget.id, asset.id)" class="material-icons small" style="cursor: pointer">clear</span></span>
                    </span>
                  </div>
                  <div class="col-md-6">
                    <i class="text-black-50 small">Subs: </i> <span :key="asset.id" v-for="asset in unit_budget.assets" >
                      <span :key="sub.id" v-for="sub in asset.subs" style="margin-right:5px">
                        <span class="badge badge-info">{{sub.sub_asset.name}} ({{sub.quantity}}) <span @click="remove_budget_sub('a', sub.id)" class="material-icons small" style="cursor: pointer">clear</span></span>
                      </span>
                    </span>
                  </div>
                </div>
                <hr>
                <div class="mb-2">Any More?</div>
                <div class="errors text-danger small" v-if="errors">
                  {{errors.detail}}
                </div>
                <div class="form-group">
                  <label for="id_asset1">Select Asset</label>
                  <select id="id_asset1" v-model="asset" class="form-control">
                    <option value="">Choose...</option>
                    <option :key="asset.id" v-for="asset in assets" :value="`${asset.id}`">{{asset.asset_name}}</option>
                  </select>
                </div>
                <div class="form-group" v-if="sub_assets.length">
                  <label>Select Sub Asset</label>
                  <select v-model="sub_asset" class="custom-select">
                    <option value="">Choose...</option>
                    <option :key="sub.id" v-for="sub in sub_assets" :value="`${sub.id}`">{{sub.name}}</option>
                  </select>
                </div>
                <div class="form-group" v-if="sub_assets.length">
                  <label>Quantity</label>
                  <input type="number" v-model="quantity" class="form-control">
                </div>
                <div class="form-group">
                  <button :disabled="formLoading || !asset" @click="new_budget_asset(unit_budget.id)" class="btn btn-sm btn-block btn-primary">Submit</button>
                </div>
              </div>
              <!--<div class="tab-pane fade mt-2" id="about1" role="tabpanel" aria-labelledby="about1-tab">-->
              <!--<div class="row">-->
              <!--<div class="col-md-12">-->
              <!--<span :key="item.id" v-for="item in unit_budget.imprests" style="margin-right:5px">-->
              <!--<span class="badge badge-primary">{{item.imprest.item_name}} <span @click="remove_budget_imprest(unit_budget.id, item.id)" class="material-icons small" style="cursor: pointer">clear</span></span>-->
              <!--</span>-->
              <!--</div>-->
              <!--</div>-->
              <!--<hr>-->
              <!--<div class="mb-2">Any More?</div>-->
              <!--<div class="errors text-danger small" v-if="errors">-->
              <!--{{errors.detail}}-->
              <!--</div>-->
              <!--<div class="form-group">-->
              <!--<label for="id_imprest1">Select Item</label>-->
              <!--<select id="id_imprest1" v-model="item" class="form-control">-->
              <!--<option value="">Choose...</option>-->
              <!--<option :key="item.id" v-for="item in imprests" :value="item.id">{{item.item_name}}</option>-->
              <!--</select>-->
              <!--</div>-->
              <!--<div class="form-group">-->
              <!--<button :disabled="formLoading" @click="new_budget_imprest(unit_budget.id)" class="btn btn-sm btn-block btn-primary">Submit</button>-->
              <!--</div>-->
              <!--</div>-->
            </div>

          </div>
        </div>
        <div class="card" v-else-if="userRole === 'UU' && unit_budget.detail && object.status !== 'Deadline'">
          <div class="card-header">New Unit Budget </div>
          <div class="card-body">

            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a class="nav-item nav-link active" id="nav-home-tab" @click="clear()" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Goods And Services</a>
              <a class="nav-item nav-link" id="nav-profile-tab" @click="clear()" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Compensation</a>
              <a class="nav-item nav-link" id="nav-contact-tab" @click="clear()" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Asset</a>
              <!--<a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Imprest</a>-->
            </div>

            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active pt-2  border-bottom-0" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <span v-if="msg">{{msg}}</span>
                <span v-if="errors" class="mt-2 text-danger">{{errors.detail}}</span>
                <div class="form-group">
                  <label >Category</label>
                  <select name="category" v-model="category" id="id_cat" class="custom-select">
                    <option value="">Select Category</option>
                    <option v-for="category in categories" :key="category.id" :value="`${category.id}`" >{{category.name}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label >Items</label>
                  <select name="item" v-model="item" id="item1" class="custom-select">
                    <option value="">Select Item</option>
                    <option v-for="item in items" :key="item.id" :value="`${item.id}`">{{item.item_name}}</option>
                  </select>
                </div>
                <div class="form-group" :hidden="!sub_items.length">
                  <label>Sub Items</label>
                  <select name="sub" id="sub1" v-model="sub_item" class="custom-select">
                    <option value="">Select Sub Item</option>
                    <option :key="sub.id" v-for="sub in sub_items" :value="`${sub.id}`">{{sub.name}}</option>
                  </select>
                </div>
                <div class="form-group" :hidden="item_obj.item_type === 'Service'">
                  <label>Quantity</label>
                  <input type="number" name="quantity" :disabled="item_obj.item_type === 'Service'" v-model="quantity" class="form-control">
                </div>
                <div class="form-group" :hidden="item_obj.item_type === 'Good' || sub_items.length > 0">
                  <label>Amount</label>
                  <input type="number" name="amount" :disabled="item_obj.item_type === 'Good' || item === ''" v-model="amount" class="form-control">
                </div>
                <div class="form-group">
                  <button :disabled="formLoading" @click="new_budget('gs')" type="submit" class="btn btn-sm btn-block btn-info"><span v-if=formLoading>Saving...</span><span v-else>Submit</span></button>
                </div>
              </div>
              <div class="tab-pane fade pt-2" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <span v-if="msg2" class="small text-warning">{{msg2}} <hr></span>
                <span v-if="errors" class="mt-2 text-danger">{{errors.detail}}</span>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_snb">Staff Number</label>
                      <input type="text" id="id_snb" v-model="number" class="form-control" placeholder="Staff Number">
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_fn">First Name</label>
                      <input type="text" id="id_fn" class="form-control" v-model="fname" placeholder="First Name">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="id_ln">Last Name</label>
                      <input type="text" id="id_ln" class="form-control" v-model="lname" placeholder="Last Name">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_type">Employee Type</label>
                      <select v-model="em_type" id="id_type" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="P">Permanent Staff</option>
                        <option value="C">Contract Staff</option>
                        <option value="T">Temporary Staff</option>
                        <option value="PT">Part-Time Staff</option>
                        <option value="N">Nabco Intern</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="id_status">Staff Status</label>
                      <select v-model="status" id="id_status" class="custom-select">
                        <option value="">Choose...</option>
                        <option value="At Post">At Post</option>
                        <option value="On Leave">On Leave</option>
                        <option value="On Paid Leave">On Paid Leave</option>
                        <option value="About to Retire">About to Retire</option>
                        <option value="Interdiction">Interdiction</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row" id="id_rn" hidden="hidden">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_rank">Rank</label>
                      <select id="id_rank" v-model="rank" class="c_rank form-control">
                        <option value="">Choose...</option>
                        <option value="CG">CG</option>
                        <option value="COMM">COMM</option>
                        <option value="DC">DC</option>
                        <option value="AC">AC</option>
                        <option value="CRO">CRO</option>
                        <option value="PRO">PRO</option>
                        <option value="SRO">SRO</option>
                        <option value="RO">RO</option>
                        <option value="ARO I">ARO I</option>
                        <option value="ARO II">ARO II</option>
                        <option value="RA I">RA I</option>
                        <option value="RA II">RA II</option>
                        <option value="RA III">RA III</option>
                        <option value="JRA I">JRA I</option>
                        <option value="JRA II">JRA II</option>
                        <option value="JRA III">JRA III</option>
                        <option value="JRA IV">JRA IV</option>
                        <option value="JRA V">JRA V</option>
                        <option value="JRA VI">JRA VI</option>
                      </select>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="id_notch">Notch</label>
                      <select id="id_notch" v-model="notch" class="c_notch form-control">
                        <option value="">Choose...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row" id="id_my" hidden="hidden">
                  <div class="col">
                    <div class="form-group">
                      <label for="id_basic">Monthly Basic Salary</label>
                      <input type="text" disabled class="form-control c_basic" id="id_basic">
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="id_period">Yearly Basic Salary</label>
                      <input type="text" disabled class="form-control c_period" id="id_period">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <button :disabled="formLoading" @click="new_budget('ec')" class="btn btn-sm btn-primary btn-block">Submit</button>
                </div>

              </div>
              <div class="tab-pane fade pt-2" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                <span v-if="msg3" class="small text-warning">{{msg3}} </span><hr>
                <span v-if="errors" class="mt-2 text-danger">{{errors.detail}}</span>
                <div class="form-group">
                  <label for="id_asset">Select Asset</label>
                  <select id="id_asset" v-model="asset" class="custom-select">
                    <option value="">Choose...</option>
                    <option :key="asset.id" v-for="asset in assets" :value="`${asset.id}`">{{asset.asset_name}}</option>
                  </select>
                </div>
                <div class="form-group" v-if="sub_assets.length">
                  <label>Select Sub Asset</label>
                  <select v-model="sub_asset" class="custom-select">
                    <option value="">Choose...</option>
                    <option :key="sub.id" v-for="sub in sub_assets" :value="`${sub.id}`">{{sub.name}}</option>
                  </select>
                </div>
                <div class="form-group" v-if="sub_assets.length">
                  <label>Quantity</label>
                  <input type="number" v-model="quantity" class="form-control">
                </div>
                <div class="form-group">
                  <button :disabled="formLoading" @click="new_budget('a')" class="btn btn-sm btn-block btn-primary">Submit</button>
                </div>
              </div>
              <!--<div class="tab-pane fade pt-2" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">-->
              <!--<div class="form-group">-->
              <!--<label for="id_im">Item</label>-->
              <!--<select v-model="item" id="id_im" class="custom-select">-->
              <!--<option value="">Choose...</option>-->
              <!--<option :key="imprest.id" v-for="imprest in imprests" :value="imprest.id">{{imprest.item_name}}</option>-->
              <!--</select>-->
              <!--</div>-->
              <!--<div class="form-group">-->
              <!--<button @click="new_budget('i')" :disabled="formLoading" class="btn btn-sm btn-block btn-primary">Submit</button>-->
              <!--</div>-->
              <!--</div>-->
            </div>

          </div>
        </div>
        <div class="card" v-else-if="userRole === 'UU' && object.status === 'Deadline'">
          <div class="card-header">{{unit_budget.unit_name}} Budget Details</div>
          <div class="card-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="home2-tab" data-toggle="tab" href="#home2" role="tab" aria-controls="home2" aria-selected="true">G & S</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="profile2-tab" data-toggle="tab" href="#profile2" role="tab" aria-controls="profile2" aria-selected="false">Compensations</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="contact2-tab" data-toggle="tab" href="#contact2" role="tab" aria-controls="contact2" aria-selected="false">Assets</a>
              </li>
              <!--<li class="nav-item">-->
              <!--<a class="nav-link" id="about2-tab" data-toggle="tab" href="#about2" role="tab" aria-controls="about2" aria-selected="false">Imprests</a>-->
              <!--</li>-->
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home2" role="tabpanel" aria-labelledby="home2-tab">
                <div class="table-responsive">
                  <table class="table table-stripe">
                    <thead>
                    <tr class="small" align="center">
                      <th>Item</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Amount (GHS)</th>
                    </tr>
                    </thead>
                    <tbody :key="item.id" v-for="item in unit_budget.items">
                    <tr class="small" align="center">
                      <td>{{item.item.item_name}}</td>
                      <td>{{item.item.category_name}}</td>
                      <td>{{item.item.item_type}}</td>
                      <td>{{item.quantity}}</td>
                      <td>{{formatPrice(item.total_amount)}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="profile2" role="tabpanel" aria-labelledby="profile2-tab">
                <div class="table-responsive">
                  <table class="table table-stripe">
                    <thead>
                    <tr class="small" align="center">
                      <th>Staff Name</th>
                      <th>Rank</th>
                      <th>Notch</th>
                      <th>Monthly Basic (GHS)</th>
                      <th>{{object.period}} Basic (GHS)</th>
                    </tr>
                    </thead>
                    <tbody :key="employ.id" v-for="employ in unit_budget.employees_compensations">
                    <tr class="small" align="center">
                      <td>{{employ.first_name}} {{employ.last_name}}</td>
                      <td>{{employ.rank}}</td>
                      <td>{{employ.notch}}</td>
                      <td>{{formatPrice(employ.monthly_basic)}}</td>
                      <td>{{formatPrice(employ.period_basic)}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="contact2" role="tabpanel" aria-labelledby="contact2-tab">
                <div class="list-group">
                  <div class="list-group-item" :key="asset.id" v-for="asset in unit_budget.assets" v-if="asset.is_selected">
                    <div class="row">
                      <!--<div class="col-md-1"><input class="form-check-input" disabled type="checkbox" :checked="asset.is_selected" value="" id="defaultCheck1"></div>-->
                      <div class="col">{{asset.asset.asset_name}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<div class="tab-pane fade" id="about2" role="tabpanel" aria-labelledby="about2-tab">-->
              <!--<div class="list-group" :key="item.id" v-for="item in unit_budget.imprests">-->
              <!--<div class="list-group-item">{{item.imprest.item_name}}</div>-->
              <!--</div>-->
              <!--</div>-->
            </div>

          </div>
        </div>
        <div class="card" v-else-if="userRole === 'UU' && unit_budget.status === 'Completed'">
          <div class="card-header">{{unit_budget.unit_name}} Budget Details</div>
          <div class="card-body">
            <ul class="nav nav-tabs" id="my-Tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="home3-tab" data-toggle="tab" href="#home3" role="tab" aria-controls="home3" aria-selected="true">G & S</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="profile3-tab" data-toggle="tab" href="#profile3" role="tab" aria-controls="profile3" aria-selected="false">Compensations</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="contact3-tab" data-toggle="tab" href="#contact3" role="tab" aria-controls="contact3" aria-selected="false">Assets</a>
              </li>
              <!--<li class="nav-item">-->
              <!--<a class="nav-link" id="about2-tab" data-toggle="tab" href="#about2" role="tab" aria-controls="about2" aria-selected="false">Imprests</a>-->
              <!--</li>-->
            </ul>
            <div class="tab-content" id="my-TabContent">
              <div class="tab-pane fade show active" id="home3" role="tabpanel" aria-labelledby="home3-tab">
                <div class="table-responsive">
                  <table class="table table-stripe">
                    <thead>
                    <tr class="small" align="center">
                      <th>Category</th>
                      <th>Item</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Amount (GHS)</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody :key="item.id" v-for="item in unit_budget.items">
                    <tr class="small" align="center">
                      <td>{{item.item.category_name}}</td>
                      <td>{{item.item.item_name}}</td>
                      <td>{{item.item.item_type}}</td>
                      <td>{{item.quantity}}</td>
                      <td>{{formatPrice(item.total_amount)}}</td>
                      <td v-if="item.subs.length">
                        <button class="btn btn-sm btn-info" data-toggle="modal" :data-target="`#item${item.id}`">
                          <i class="fa fa-object-ungroup"></i>
                        </button>
                        <div class="modal fade" :id="`item${item.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{{item.item.item_name}} Sub Items</h5>
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
                                    <th>Unit Price</th>
                                    <th>Total Amount</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr :key="sub.id" v-for="sub in item.subs">
                                    <td>{{sub.sub_item.name}}</td>
                                    <td>{{sub.quantity}}</td>
                                    <td>{{sub.unit_price}}</td>
                                    <td>{{sub.total_amount}}</td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>

                            </div>
                          </div>
                        </div>
                      </td>

                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="profile3" role="tabpanel" aria-labelledby="profile3-tab">
                <div class="table-responsive">
                  <table class="table table-stripe">
                    <thead>
                    <tr class="small" align="center">
                      <th>Staff Name</th>
                      <th>Rank</th>
                      <th>Notch</th>
                      <th>Monthly Basic (GHS)</th>
                      <th>{{object.period}} Basic (GHS)</th>
                    </tr>
                    </thead>
                    <tbody :key="employ.id" v-for="employ in unit_budget.employees_compensations">
                    <tr class="small" align="center">
                      <td>{{employ.first_name}} {{employ.last_name}}</td>
                      <td>{{employ.rank}}</td>
                      <td>{{employ.notch}}</td>
                      <td>{{formatPrice(employ.monthly_basic)}}</td>
                      <td>{{formatPrice(employ.period_basic)}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="contact3" role="tabpanel" aria-labelledby="contact3-tab">
                <div class="list-group" :key="asset.id" v-for="asset in unit_budget.assets" v-if="asset.is_selected">
                  <div class="list-group-item">
                    <div class="row">
                      <!--<div class="col-md-1"><input class="form-check-input" disabled type="checkbox" :checked="asset.is_selected" value="" id="defaultCheck2"></div>-->
                      <div class="col-md-11">{{asset.asset.asset_name}}</div>
                      <div class="col-md-1" v-if="asset.subs.length">
                        <a :href="`#asset${asset.id}`" data-toggle="collapse" role="button" :aria-controls="`asset${asset.id}`" aria-expanded="false" class="btn btn-sm btn-info">
                          <i class="fa fa-sort"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="collapse multiple-collapse" :id="`asset${asset.id}`">
                    <table class="table">
                      <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Quantity</th>
                        <th>Unit Price (GHS)</th>
                        <th>Total Amount (GHS)</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr :key="sub.id" v-for="sub in asset.subs">
                        <td>{{sub.sub_asset.name}}</td>
                        <td>{{sub.quantity}}</td>
                        <td>{{sub.unit_price}}</td>
                        <td>{{sub.total_amount}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
              <!--<div class="tab-pane fade" id="about2" role="tabpanel" aria-labelledby="about2-tab">-->
              <!--<div class="list-group" :key="item.id" v-for="item in unit_budget.imprests">-->
              <!--<div class="list-group-item">{{item.imprest.item_name}}</div>-->
              <!--</div>-->
              <!--</div>-->
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
        categories: {},
        items: {},
        completed: '',
        sub_items: {},
        sub_assets: {},
        unit_budget: {},
        quantity: '',
        amount: '',
        item: '',
        sub_item: '',
        asset: '',
        sub_asset: '',
        assets: {},
        imprests: {},
        item_obj: {},
        em_type: '',
        em_type1: '',
        category: '',
        errors: {},
        formLoading: false,
        loading: false,
        pageloading: false,
        msg: '',
        msg2: '',
        msg3: '',
        fname: '',
        lname: '',
        position: '',
        number: '',
        rank: '',
        notch: '',
        rank1: '',
        notch1: '',
        scale: {},
        year_salary: 0.0,
        basic: 0.0,
        status: '',
        unit_budgets: {},
      };
    },
    computed: {
      userRole() {
        return this.$root.auth.user.user_role;
      },
    },
    mounted() {
      this.details();
      this.category_list();
      this.current_unit_budget();
      this.asset_list();
      this.imprest_list();
      this.deadlines();
    },
    methods: {
      deadlines(){
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        // console.log(date);
        axios.get(`${config.apiUrl}/budget/deadline/${date}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          console.log(res.data);
          this.details();
        })
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.');
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      clear(){
        this.quantity = '';
        this.amount = '';
        this.item = '';
        this.sub_item = '';
        this.asset = '';
        this.sub_asset = '';
        this.em_type = '';
        this.em_type1 = '';
        this.category = '';
        this.msg = '';
        this.msg2 = '';
        this.msg3 = '';
        this.fname = '';
        this.lname = '';
        this.number = '';
        this.rank = '';
        this.notch = '';
        this.rank1 = '';
        this.notch1 = '';
        this.errors = {};
        this.basic = 0.0;
        this.year_salary = 0.0;
        this.status = '';
      },
      open_period(id){
        this.loading = true;
        axios.get(`${config.apiUrl}/budget/opbp/${id}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.details();
          this.loading = false;
          console.log(res);
          this.$noty.success(`Great! Budget Period is now opened to new unit budgets`);
        }).catch(({response}) => {
          this.loading = false;
          console.log(response);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }
        });
      },
      close_period(id){
        this.loading = true;
        axios.get(`${config.apiUrl}/budget/cbp/${id}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.details();
          this.$noty.success('Great! Budget Period is closed to new unit budgets');
          this.loading = false;
          console.log(res);

        }).catch(({response}) => {
          this.loading = false;
          console.log(response);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }
        });
      },
      complete_period(id){
        if(id){
          this.loading = true;
          axios.post(`${config.apiUrl}/budget/cmbp/`, {
            budget_period: id
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`,
            },
          }).then((response) => {
            this.loading = false;
            this.details();
            $('#completeModal').modal('hide');
            this.$noty.success('Budget Period Completed!');
          }).catch(({response}) => {
            this.loading = false;
          this.pageloading = false;
          console.log(response);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            const error = response.data;
            this.$noty.error(`Oops! ${error.detail}`);
          }
        })
        }
      },
      details() {
        this.pageloading = true;
        const id = this.$route.params.period_id;
        axios.get(`${config.apiUrl}/budget/obp/${id}`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          },
        }).then((response) => {
          this.pageloading = false;
          const results = response.data;
          this.object = results.budget_period;
          this.unit_budgets = results.unit_budgets;
          this.completed = results.all_completed;
          console.log(response);
          this.$noty.success('Everything looks great!');
        }).catch(({response}) => {
          this.pageloading = false;
          console.log(response);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }
        })
      },
      category_list() {
        axios.get(`${config.apiUrl}/api/categories/`, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((response) => {
          this.categories = response.data;
          console.log(response);
        });
      },
      asset_list() {
        axios.get(`${config.apiUrl}/api/assets/`, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((response) => {
          this.assets = response.data;
          console.log(response);
        });
      },
      imprest_list(){
        axios.get(`${config.apiUrl}/api/imprests/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`,
          }
        }).then((response) => {
          this.imprests = response.data;
          console.log(response);
        })
      },
      category_items_list(value) {
        // const sel = document.getElementById('id_category');
        // console.log(sel.value);
        if (value) {
          axios.get(`${config.apiUrl}/api/ci/${value}`, {
            headers: { Authorization: `JWT ${config.get_token()}` },
          }).then((response) => {
            const results = response.data;
            this.items = results.items;
            console.log(this.items);
          });
        }
      },
      item_subs_list(value){
        if(value){
          axios.get(`${config.apiUrl}/api/isi/${value}/`, {
            headers: { Authorization: `JWT ${config.get_token()}` },
          }).then((response) => {
            const results = response.data;
            this.sub_items = results.subs;
          })
        }
      },
      asset_subs_list(value){
        if(value){
          axios.get(`${config.apiUrl}/api/asa/${value}/`, {
            headers: { Authorization: `JWT ${config.get_token()}` },
          }).then((response) => {
            const results = response.data;
            this.sub_assets = results.subs;
          })
        }
      },
      item_details(id){
        if(id){
          axios.get(`${config.apiUrl}/api/id/${id}/`, {
            headers: { Authorization: `JWT ${config.get_token()}` },
          }).then((response) => {
            // const results = response.data;
            this.item_obj = response.data;
            console.log(response.data);
            // console.log(this.items);
          }).catch((res) => {
            console.log(res);
          });
        }

      },
      current_unit_budget() {
        this.$noty.info('Loading...');
        const id = this.$route.params.period_id;
        axios.get(`${config.apiUrl}/budget/cpub/${id}`, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((response) => {
          // var results = response.data
          this.unit_budget = response.data;
          console.log(response.data);
          this.$noty.success('Everything looks great');
        }).catch(({response}) => {
          this.unit_budget = response.data;
          console.log(response);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }
        });
      },
      new_budget(type) {
        const id = this.$route.params.period_id;
        if (type === 'gs'){
          if (id && this.item && this.category) {
            this.formLoading = true;
            axios.post(`${config.apiUrl}/budget/nub/${type}/`, {
              category: this.category,
              item: this.item,
              quantity: this.quantity,
              amount: this.amount,
              budget_period: id,
            }, {
              headers: { Authorization: `JWT ${config.get_token()}` },
            }).then((response) => {
              this.formLoading = false;
              console.log(response.data);
              this.quantity = '';
              this.category = '';
              this.item = '';
              this.amount = '';
              this.errors = {};
              this.$noty.success('New Goods and Services Item Added');
              this.current_unit_budget();
            }).catch(({ response }) => {
              this.formLoading = false;
              this.errors = response.data;
              console.log(response.data);
              if(response.status === 401){
                this.$noty.error(`Oops! Your session has expired.`);
                localStorage.removeItem('auth');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$router.push('/login');
              }else{
                this.$noty.error(`Oops! ${this.errors.detail}`);
              }
            });
          }else{
            this.msg = "All fields are required"
          }
        }
        else if (type === 'ec'){
          if(id && this.fname && this.lname && this.number && this.em_type && this.status){
            this.formLoading = true;
            axios.post(`${config.apiUrl}/budget/nub/${type}/`, {
              budget_period: id,
              fname: this.fname,
              lname: this.lname,
              number: this.number,
              rank: this.rank,
              notch: this.notch,
              em_type: this.em_type,
              status: this.status,
              // position: this.position,
            }, {
              headers: {
                Authorization: `JWT ${config.get_token()}`
              }
            }).then((res) => {
              this.formLoading = false;
              this.lname = '';
              this.fname = '';
              this.number = '';
              this.rank = '';
              this.notch = '';
              this.status = '';
              this.position = '';
              this.em_type = '';
              this.errors = {};
              document.getElementById('id_basic').value = '';
              document.getElementById('id_period').value = '';
              this.$noty.success('New Employee Compensation added');
              this.current_unit_budget();
            }).catch(({response}) => {
              this.current_unit_budget();
              this.errors = response.data;
              this.formLoading = false;
              console.log(response);
              if(response.status === 401){
                this.$noty.error(`Oops! Your session has expired.`);
                localStorage.removeItem('auth');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$router.push('/login');
              }else{
                this.$noty.warning(`Oops! ${this.errors.detail}`);
              }
            })
          }else{
            this.msg2 = "All fields are required";
          }
        }
        else if(type === 'a'){
          if(this.asset){
            this.formLoading = true;
            axios.post(`${config.apiUrl}/budget/nub/${type}/`, {
              asset: this.asset,
              quantity: this.quantity,
              sub_asset: this.sub_asset,
              budget_period: id,
            }, {
              headers: {
                Authorization: `JWT ${config.get_token()}`
              }
            }).then((res) => {
              this.formLoading = false;
              this.asset = '';
              this.errors = {};
              this.$noty.success('New Asset Item selected');
              this.current_unit_budget();
            }).catch(({response}) => {
              this.current_unit_budget();
              this.errors = response;
              this.formLoading = false;
              if(response.status === 401){
                this.$noty.error(`Oops! Your session has expired.`);
                localStorage.removeItem('auth');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$router.push('/login');
              }else{
                this.$noty.error(`Oops! ${this.errors.detail}`);
              }
            })
          }else{
            this.msg3 = "All fields are required";
          }
        }
        else if(type === 'i'){
          if(id && this.item){
            this.formLoading = true;
            axios.post(`${config.apiUrl}/budget/nub/${type}/`, {
              item: this.item,
              budget_period: id,
            }, {
              headers: {Authorization: `JWT ${config.get_token()}`}
            }).then((res) => {
              this.formLoading = false;
              this.item = '';
              this.errors = {};
              this.current_unit_budget();
              console.log(res.data);
              this.errors = {};
            })
          }
        }

      },
      new_budget_item(ubid) {
        // console.log(ubid);
        if (ubid && this.item) {
          this.formLoading = true;
          axios.post(
            `${config.apiUrl}/budget/nubi/`, {
              ub_id: ubid,
              item: this.item,
              quantity: this.quantity,
              sub_item: this.sub_item,
              amount: this.amount,
            },
            {
              headers: { Authorization: `JWT ${config.get_token()}` },
            },
          ).then((response) => {
            this.formLoading = false;
            console.log(response.data);
            this.quantity = '';
            this.category = '';
            this.item = '';
            this.amount = '';
            this.sub_item = '';
            this.errors = {};
            this.$noty.success('New Goods and Services Item added');
            this.current_unit_budget();
          }).catch(({ response }) => {
            this.formLoading = false;
            this.errors = response.data;
            console.log(response.data);
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${this.errors.detail}`);
            }
          });
        }
      },
      new_budget_com(ubid){
        if(ubid && this.fname && this.lname && this.number && this.em_type1 && this.status){
          this.formLoading = true;
          axios.post(`${config.apiUrl}/budget/nubc/`, {
            ub_id: ubid,
            fname: this.fname,
            lname: this.lname,
            number: this.number,
            rank: this.rank1,
            notch: this.notch1,
            emt: this.em_type1,
            amount: this.amount,
            // position: this.position,
            status: this.status
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`
            }
          }).then((res) => {
            this.formLoading = false;
            console.log(res.data);
            this.fname = '';
            this.lname = '';
            this.amount = '';
            this.number = '';
            this.rank1 = '';
            this.notch1 = '';
            this.status = '';
            this.position = '';
            this.em_type = '';
            document.getElementById('id_basic1').value = '';
            document.getElementById('id_period1').value = '';
            this.errors = {};
            this.$noty.success('New Employee Compensation added');
            this.current_unit_budget();
          }).catch(({response}) => {
            this.errors = response.data;
            this.formLoading = false;
            console.log(response.data);
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${this.errors.detail}`);
            }
            this.current_unit_budget();
          });
        }
      },
      new_budget_asset(ubid){
        if(this.asset && ubid){
          this.formLoading = true;
          axios.post(`${config.apiUrl}/budget/nuba/`, {
            ub_id: ubid,
            asset: this.asset,
            sub_asset: this.sub_asset,
            quantity: this.quantity,
          }, {
            headers: {
              Authorization: `JWT ${config.get_token()}`
            }
          }).then((res) => {
            this.formLoading = false;
            this.asset = '';
            this.sub_asset = '';
            this.quantity = '';
            this.errors = {};
            this.$noty.success('New Asset Item added');
            this.current_unit_budget();
          }).catch(({response}) => {
            this.formLoading = false;
            this.asset = '';
            this.sub_asset = '';
            this.quantity = '';
            // this.errors = {};
            this.errors = response.data;
            this.current_unit_budget();
            console.log(response);
            if(response.status === 401){
              this.$noty.error(`Oops! Your session has expired.`);
              localStorage.removeItem('auth');
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.$router.push('/login');
            }else{
              this.$noty.error(`Oops! ${this.errors.detail}`);
            }
          })
        }
      },
      new_budget_imprest(ubid){
        if(this.item && ubid){
          this.formLoading = true;
          axios.post(`${config.apiUrl}/budget/nubp/`, {
            ub_id: ubid,
            item: this.item,
          }, {
            headers: { Authorization: `JWT ${config.get_token()}`}
          }).then((res) => {
            this.formLoading = false;
            this.item = '';
            this.errors = {};
            console.log(res);
            this.current_unit_budget();
          }).catch(({response}) => {
            this.formLoading = false;
            this.item = '';
            this.errors = response.data;
            this.current_unit_budget();
          });
        }
      },
      remove_budget_item(ubid, item) {
        axios.post(`${config.apiUrl}/budget/rubi/${ubid}/${item}/`, {}, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((response) => {
          console.log(response);
          this.$noty.success('Item has been removed');
          this.current_unit_budget();
        }).catch(({ response }) => {
          console.log(response.data);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
        });
      },
      remove_budget_com(ubid, com){
        axios.post(`${config.apiUrl}/budget/rubc/${ubid}/${com}/`, {}, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((res) => {
          console.log(res);
          this.$noty.success('Employee Compensation has been removed');
          this.current_unit_budget();
        }).catch(({response}) => {
          console.log(response.data);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
        })
      },
      remove_budget_asset(ubid, asset){
        axios.post(`${config.apiUrl}/budget/ruba/${ubid}/${asset}/`, {}, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((res) => {
          this.current_unit_budget();
          console.log(res);
          this.$noty('Asset Item has been removed');
        }).catch(({response}) => {
          console.log(response.data);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
        })
      },
      remove_budget_sub(type, sub){
        axios.post(`${config.apiUrl}/budget/rbs/${sub}/${type}/`, {}, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          this.current_unit_budget();
          console.log(res);
          this.$noty.success("Sub Removed");
        }).catch(({res}) => {
          console.log(res.data);
          if(res.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error("Oops! Something went terribly wrong!");
          }
        })
      },
      remove_budget_imprest(ubid, imp){
        axios.post(`${config.apiUrl}/budget/rubim/${ubid}/${imp}/`, {}, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((res) => {
          this.current_unit_budget();
          console.log(res);
        }).catch(({res}) => {
          console.log(res.data);
        })
      },
      confirm_budget(ubid) {
        this.loading = true;
        $('#confirmModal').modal('show');
        this.$noty.info('Please wait a minute!');
        document.getElementById('id_confirm').disabled = true;
        axios.post(`${config.apiUrl}/budget/cfub/${ubid}/`, {}, {
          headers: { Authorization: `JWT ${config.get_token()}` },
        }).then((response) => {
          this.loading = false;
          $('#confirmModal').modal('hide');
          document.getElementById('id_confirm').disabled = false;
          this.$noty.success('Great! Your budget selection has been confirmed now!');
          console.log(response);
          this.current_unit_budget();
        }).catch(({ response }) => {
          document.getElementById('id_confirm').disabled = true;
          this.loading = false;
          this.errors = response.data;
          console.log(response.data);
          if(response.status === 401){
            this.$noty.error(`Oops! Your session has expired.`);
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
          }else{
            this.$noty.error(`Oops! ${this.errors.detail}`);
          }
        });
      },
      find_scale(rank, notch){
        axios.get(`${config.apiUrl}/budget/fs/${rank}/${notch}/`, {
          headers: {
            Authorization: `JWT ${config.get_token()}`
          }
        }).then((res) => {
          console.log(res);
          this.scale = res.data;
          this.basic = this.scale.monthly_basic;
          this.year_salary = this.scale.monthly_basic * 12;
          if(this.notch){
            document.getElementById('id_basic').value = this.scale.monthly_basic ? `GHS ${this.formatPrice(this.basic)}` : 'GHS 0';
            document.getElementById('id_period').value = `GHS ${this.formatPrice(this.year_salary)}`;
          }else if(this.notch1){
            document.getElementById('id_basic1').value = this.scale.monthly_basic ? `GHS ${this.formatPrice(this.basic)}` : 'GHS 0';
            document.getElementById('id_period1').value = `GHS ${this.formatPrice(this.year_salary)}`;
          }

        })
      }
    },
    watch: {
      category(){
        // var sel = document.getElementById('id_cat').value ? document.getElementById('id_cat').value : document.getElementById('id_category').value;
        // var sel1 = document.getElementById('id_category').value;
        if(this.category){
          this.category_items_list(this.category);
        }
        // else if(sel1){
        //   this.category_items_list(sel1);
        // }
      },
      item(){
        // var sel = document.getElementById('item1').value;
        if(this.item){
          this.item_details(this.item);
          this.item_subs_list(this.item);
          // if(this.item_obj.item_type === 'Good'){
          //   document.getElementById('id_fg_qnty').hidden = false;
          // }else{
          //   document.getElementById('id_fg_qnty').hidden = true;
          // }
        }

      },
      asset(){
        if(this.asset){
          this.asset_subs_list(this.asset);
        }
      },
      notch(){

        const rank = document.getElementById('id_rank').value;
        const notc = document.getElementById('id_notch').value;
        if(rank && notc){
          this.find_scale(rank, notc);
        }
      },
      notch1(){

        const rank = document.getElementById('id_rank1').value;
        var notc = document.getElementById('id_notch1').value;

        if(rank && notc){
          this.find_scale(rank, notc);
        }else{
          document.getElementById('id_submit1').disabled = true;
        }
      },
      em_type(){
        const value = document.getElementById('id_type').value;
        if(value === 'P'){
          document.getElementById('id_rn').hidden = false;
          document.getElementById('id_my').hidden = false;
        }else{
          document.getElementById('id_rn').hidden = true;
          document.getElementById('id_my').hidden = true;
        }


      },
      em_type1(){
        const value1 = document.getElementById('id_type1').value;
        if(value1 === 'P'){
          document.getElementById('id_rn1').hidden = false;
          document.getElementById('id_my1').hidden = false;
        }else{
          document.getElementById('id_rn1').hidden = true;
          document.getElementById('id_my1').hidden = true;
        }
      },
    }

  };
</script>
