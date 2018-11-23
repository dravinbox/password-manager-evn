/**
 * Created by xushaoping on 17/9/12.
 */

import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

// 打印数据存储路径
console.log(path.join(remote.app.getPath('userData'), '/data.db'))

let db = {};
db.project = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/nedb/project.db')
});
db.password = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/nedb/password.db')
});

// export default new Datastore({
//     autoload: true,
//     filename: path.join(remote.app.getPath('userData'), '/data.db')
// })

export default db