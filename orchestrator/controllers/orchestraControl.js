const { default: axios } = require("axios");
const Redis = require("ioredis");
const fs = require("fs");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const createReadUri = process.env.createReadUri;
const updateDeleteUri = process.env.updateDeleteUri;

const redis = new Redis({
  host: "redis-16599.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 16599,
  password: process.env.redis_pass,
});

class orchestraControl {
  static async getAll(req, res, next) {
    try {
      const cacheProduct = await redis.get("users:getAll");
      if (cacheProduct) {
        return res.status(200).json(JSON.parse(cacheProduct));
      } else {
        const { data } = await axios({
          method: "get",
          url: `${createReadUri}/`,
        });
        await redis.set("users:getAll", JSON.stringify(data));
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async getOneId(req, res, next) {
    try {
      const cacheProduct = await redis.get(
        `users:getOneId/${req.params.identityNumber}`
      );
      if (cacheProduct) {
        return res.status(200).json(JSON.parse(cacheProduct));
      } else {
        const { data } = await axios({
          method: "get",
          url: `${createReadUri}/identityNumber/${req.params.identityNumber}`,
        });
        await redis.set(
          `users:getOneId/${req.params.identityNumber}`,
          JSON.stringify(data)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async getOneAcc(req, res, next) {
    try {
      const cacheProduct = await redis.get(
        `users:getOneAcc/${req.params.accountNumber}`
      );
      if (cacheProduct) {
        return res.status(200).json(JSON.parse(cacheProduct));
      } else {
        const { data } = await axios({
          method: "get",
          url: `${createReadUri}/accountNumber/${req.params.accountNumber}`,
        });
        await redis.set(
          `users:getOneAcc/${req.params.accountNumber}`,
          JSON.stringify(data)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async postOne(req, res, next) {
    try {
      const payload = req.body;
      const { data } = await axios({
        method: "post",
        url: `${createReadUri}/`,
        data: payload,
      });
      await redis.del("users:getAll");
      console.log(data);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async editOne(req, res, next) {
    try {
      const payload = req.body;
      const { data } = await axios({
        method: "put",
        url: `${updateDeleteUri}/accountNumber/${req.params.accountNumber}`,
        data: payload,
      });
      await redis.del(`users:getAll`);
      await redis.del(`users:getOneAcc/${req.params.accountNumber}`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteOne(req, res, next) {
    try {
      const { data } = await axios({
        method: "delete",
        url: `${updateDeleteUri}/accountNumber/${req.params.accountNumber}`,
      });
      await redis.del(`users:getAll`);
      await redis.del(`users:getOneAcc/${req.params.accountNumber}`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {}
  }
}

module.exports = orchestraControl;
