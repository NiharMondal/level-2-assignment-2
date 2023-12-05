"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = __importDefault(require("./user-model"));
//create user
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(user);
    return result;
});
//find all users
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find().select("-orders");
    return result;
});
//find single user
const findSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //checking user is found or not
    const checkUser = yield user_model_1.default.isUserExists(id);
    if (!checkUser) {
        throw new Error("User not found!");
    }
    const result = yield user_model_1.default.findOne({ userId: id }).select("-orders");
    return result;
});
//update user
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    //checking user is found or not
    const user = yield user_model_1.default.isUserExists(id);
    if (!user) {
        throw new Error("User not found!");
    }
    const result = yield user_model_1.default.findOneAndUpdate({ userId: id }, userData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //checking user is found or not
    const user = yield user_model_1.default.isUserExists(id);
    if (!user) {
        throw new Error("User not found!");
    }
    yield user_model_1.default.deleteOne({ userId: id });
});
exports.userServices = {
    createUser,
    findAllUsers,
    findSingleUser,
    updateUser,
    deleteUser,
};
