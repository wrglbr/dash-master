<template>
  <div>
    <d-container fluid class="main-content-container px-4">

      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Overview</span>
          <h3 class="page-title">Components</h3>
        </d-col>
      </d-row>

      <d-row >
<d-col lg="8">

          <d-card class="card-small">

            <!-- Form Example -->
            <d-card-header class="border-bottom">
              <h6 class="m-0">Form Example</h6>
            </d-card-header>

            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col>
                    <d-form>
                      <d-form-row>
                        <d-col md="6" class="form-group">
                          <label for="feEmailAddress">Email</label>
                          <d-input id="feEmailAddress" type="email" placeholder="Email" />
                        </d-col>
                        <d-col md="6">
                          <label for="fePassword">Password</label>
                          <d-input id="fePassword" type="password" placeholder="Password" />
                        </d-col>
                      </d-form-row>

                      <div class="form-group">
                        <label for="feInputAddress">Address</label>
                        <d-input id="feInputAddress" placeholder="1234 Main St" />
                      </div>

                      <div class="form-group">
                        <label for="feInputAddress2">Address 2</label>
                        <d-input id="feInputAddress2" placeholder="Apartment, Studio, or Floor" />
                      </div>

                      <d-form-row>
                        <d-col md="6" class="form-group">
                          <label for="feInputCity">City</label>
                          <d-input id="feInputCity" />
                        </d-col>
                        <d-col md="4" class="form-group">
                          <label for="feInputState">State</label>
                          <d-select id="feInputState">
                            <option>Choose...</option>
                            <option>...</option>
                          </d-select>
                        </d-col>
                        <d-col md="2" class="form-group">
                          <label for="feInputZip">Zip</label>
                          <d-input id="feInputZip" />
                        </d-col>
                        <d-col md="12" class="form-group">
                          <d-checkbox>I agree with your <a href="#">Privacy Policy</a>.</d-checkbox>
                        </d-col>
                      </d-form-row>
                      <d-button type="submit">Create New Account</d-button>
                    </d-form>
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>

          </d-card>
        </d-col>

      </d-row>
    </d-container>
  </div>
</template>
