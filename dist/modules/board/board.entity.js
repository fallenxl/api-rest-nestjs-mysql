"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const task_entity_1 = require("../task/task.entity");
let Board = class Board {
};
exports.Board = Board;
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: false }),
    __metadata("design:type", Number)
], Board.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.boards),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.User)
], Board.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.board, { cascade: true }),
    __metadata("design:type", Array)
], Board.prototype, "tasks", void 0);
exports.Board = Board = __decorate([
    (0, typeorm_1.Entity)({ name: 'boards' })
], Board);
//# sourceMappingURL=board.entity.js.map