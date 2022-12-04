import { randomUUID } from 'crypto';
import request from 'supertest';
import { httpServer as app } from '../..';
import db from '../../db';

describe('/api/login',()=>{

    it('is logging in with email',async ()=>{
      let response =  await request(app)
           .post('/api/login')
           .send({"email":'test@gmail.com','password':"testPass"});
             expect(JSON.parse(response.text)).toHaveProperty("accessToken")
             expect(JSON.parse(response.text)).toHaveProperty("refreshToken")
          
   });
   it('is logging in with incorrect email',async ()=>{
    let response =  await request(app)
         .post('/api/login')
         .send({"email":'tet@gmail.com','password':"testPass"});
            expect(JSON.parse(response.text)).toBe('incorrect email or password')
        
 });

   it('returns error if logging in with incorrect username or email ',async ()=>{
    let response =  await request(app).
         post('/api/login')
         .send({"email":'notValid@gmail.com','password':"0-24kjsadfg-08"});
   expect(JSON.parse(response.text)).toBe("incorrect email or password")
        
 });
 it('returns  not enough information (-mail -pass)',async ()=>{
  let response =  await request(app).
       post('/api/login')
       .send({"email":'','password':""});
 expect(JSON.parse(response.text)).toBe("not enough information")
      
});
it('returns  not enough information (-mail)',async ()=>{
  let response =  await request(app).
       post('/api/login')
       .send({"email":'','password':"sdfsdf"});
 expect(JSON.parse(response.text)).toBe("not enough information")
      
});
it('returns  not enough information (-pass)',async ()=>{
  let response =  await request(app).
       post('/api/login')
       .send({"email":'test@gmail.com','password':""});
 expect(JSON.parse(response.text)).toBe("not enough information")
      
});
});

describe('/api/registration',()=>{
  it('should not register',async ()=>{
    let response = await request(app) 
    .post('api/registration') 
    .send({
      email:'test@gmail.com',
      password:'testPass',
      username:'test'
    });
    expect(JSON.parse(response.text)).toBe('user already exists');
  
  });

})