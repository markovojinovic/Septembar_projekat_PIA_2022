"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const knjiga_routes_1 = __importDefault(require("./routers/knjiga.routes"));
const app = (0, express_1.default)();
const path = require('path');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/PIA_Projekat_Septembar_2022');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('Otvorila se konekcija sa bazom');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/knjige', knjiga_routes_1.default);
app.use(express_1.default.json());
app.use("/static", express_1.default.static(path.join(__dirname, '../src/assets')));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map