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
exports.Task = exports.TaskStatus = void 0;
const typeorm_1 = require("typeorm");
const board_entity_1 = require("../board/board.entity");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["ToDo"] = "To Do";
    TaskStatus["InProgress"] = "In Progress";
    TaskStatus["Done"] = "Done";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
let Task = class Task {
};
exports.Task = Task;
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TaskStatus, default: TaskStatus.ToDo }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'board_id', nullable: false }),
    __metadata("design:type", Number)
], Task.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.Board, (board) => board.tasks, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'board_id' }),
    __metadata("design:type", board_entity_1.Board)
], Task.prototype, "board", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)({ name: 'tasks' })
], Task);
//# sourceMappingURL=task.entity.js.map