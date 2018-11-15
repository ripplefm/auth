import { suite } from 'mocha-typescript';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

@suite('Registration Controller')
class RegistrationControllerTest {
  public static before() {
    chai.use(chaiHttp);
  }
}
