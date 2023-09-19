### Install

```sh
npm i mongoose express cors helmet morgan lodash envalid jsonwebtoken bcrypt compression zod dotenv nodemon dayjs

### note

# Course
{
  "name": "Course View",
  "desc": "Xem liệu trình",
  "alias": "course.view"
}
{
  "name": "Course Add",
  "desc": "Thêm liệu trình",
  "alias": "course.add"
}
{
  "name": "Course Update",
  "desc": "Cập nhật liệu trình",
  "alias": "course.update"
}
{
  "name": "Course Delete",
  "desc": "Xoá liệu trình",
  "alias": "course.delete"
}

# service
{
  "name": "service view",
  "desc": "Xem dịch vụ",
  "alias": "service.view"
}
{
  "name": "service add",
  "desc": "Thêm dịch vụ",
  "alias": "service.add"
}
{
  "name": "service update",
  "desc": "Cập nhật dịch vụ",
  "alias": "service.update"
}
{
  "name": "service delete",
  "desc": "Xoá dịch vụ",
  "alias": "service.delete"
}

# servicetype
{
  "name": "servicetype view",
  "desc": "Xem loại dịch vụ",
  "alias": "servicetype.view"
}
{
  "name": "servicetype add",
  "desc": "Thêm loại dịch vụ",
  "alias": "servicetype.add"
}
{
  "name": "servicetype update",
  "desc": "Cập nhật loại dịch vụ",
  "alias": "servicetype.update"
}
{
  "name": "servicetype delete",
  "desc": "Xoá loại dịch vụ",
  "alias": "servicetype.delete"
}

# combo
{
  "name": "combo view",
  "desc": "Xem combo",
  "alias": "combo.view"
}
{
  "name": "combo add",
  "desc": "Thêm combo",
  "alias": "combo.add"
}
{
  "name": "combo update",
  "desc": "Cập nhật combo",
  "alias": "combo.update"
}
{
  "name": "combo delete",
  "desc": "Xoá combo",
  "alias": "combo.delete"
}

# staff
{
  "name": "staff view",
  "desc": "Xem nhân viên",
  "alias": "staff.view"
}
{
  "name": "staff add",
  "desc": "Thêm nhân viên",
  "alias": "staff.add"
}
{
  "name": "staff update",
  "desc": "Cập nhật nhân viên",
  "alias": "staff.update"
}
{
  "name": "staff delete",
  "desc": "Xoá nhân viên",
  "alias": "staff.delete"
}

# manager
{
  "name": "manager view",
  "desc": "Xem nhân viên quản lý",
  "alias": "manager.view"
}
{
  "name": "manager add",
  "desc": "Thêm nhân viên quản lý",
  "alias": "manager.add"
}
{
  "name": "manager update",
  "desc": "Cập nhật nhân viên quản lý",
  "alias": "manager.update"
}
{
  "name": "manager delete",
  "desc": "Xoá nhân viên quản lý",
  "alias": "manager.delete"
}

# branch
{
  "name": "branch view",
  "desc": "Xem chi nhánh",
  "alias": "branch.view"
}
{
  "name": "branch add",
  "desc": "Thêm chi nhánh",
  "alias": "branch.add"
}
{
  "name": "branch update",
  "desc": "Cập nhật chi nhánh",
  "alias": "branch.update"
}
{
  "name": "branch delete",
  "desc": "Xoá chi nhánh",
  "alias": "branch.delete"
}


{
      "_id": "64f5c2b22c268c9c00c1fdb5",
      "name": "Course View",
      "alias": "course.view",
      "desc": "Xem liệu trình",
      "createdAt": "2023-09-04T11:42:42.623Z",
      "updatedAt": "2023-09-04T11:42:42.623Z"
    },
    {
      "_id": "64f5c2bf2c268c9c00c1fdb9",
      "name": "Course Add",
      "alias": "course.add",
      "desc": "Thêm liệu trình",
      "createdAt": "2023-09-04T11:42:55.968Z",
      "updatedAt": "2023-09-04T11:42:55.968Z"
    },
    {
      "_id": "64f5c2d82c268c9c00c1fdbd",
      "name": "Course Update",
      "alias": "course.update",
      "desc": "Cập nhật liệu trình",
      "createdAt": "2023-09-04T11:43:20.232Z",
      "updatedAt": "2023-09-04T11:43:20.232Z"
    },
    {
      "_id": "64f5c2df2c268c9c00c1fdc1",
      "name": "Course Delete",
      "alias": "course.delete",
      "desc": "Xoá liệu trình",
      "createdAt": "2023-09-04T11:43:27.223Z",
      "updatedAt": "2023-09-04T11:43:27.223Z"
    },
    {
      "_id": "64f5c2e62c268c9c00c1fdc5",
      "name": "service view",
      "alias": "service.view",
      "desc": "Xem dịch vụ",
      "createdAt": "2023-09-04T11:43:34.055Z",
      "updatedAt": "2023-09-04T11:43:34.055Z"
    },
    {
      "_id": "64f5c2eb2c268c9c00c1fdc9",
      "name": "service add",
      "alias": "service.add",
      "desc": "Thêm dịch vụ",
      "createdAt": "2023-09-04T11:43:39.558Z",
      "updatedAt": "2023-09-04T11:43:39.558Z"
    },
    {
      "_id": "64f5c2f12c268c9c00c1fdcd",
      "name": "service update",
      "alias": "service.update",
      "desc": "Cập nhật dịch vụ",
      "createdAt": "2023-09-04T11:43:45.908Z",
      "updatedAt": "2023-09-04T11:43:45.908Z"
    },
    {
      "_id": "64f5c2f72c268c9c00c1fdd1",
      "name": "service delete",
      "alias": "service.delete",
      "desc": "Xoá dịch vụ",
      "createdAt": "2023-09-04T11:43:51.658Z",
      "updatedAt": "2023-09-04T11:43:51.658Z"
    },
    {
      "_id": "64f5c2fe2c268c9c00c1fdd5",
      "name": "servicetype view",
      "alias": "servicetype.view",
      "desc": "Xem loại dịch vụ",
      "createdAt": "2023-09-04T11:43:58.644Z",
      "updatedAt": "2023-09-04T11:43:58.644Z"
    },
    {
      "_id": "64f5c3032c268c9c00c1fdd9",
      "name": "servicetype add",
      "alias": "servicetype.add",
      "desc": "Thêm loại dịch vụ",
      "createdAt": "2023-09-04T11:44:03.960Z",
      "updatedAt": "2023-09-04T11:44:03.960Z"
    },
    {
      "_id": "64f5c3082c268c9c00c1fddd",
      "name": "servicetype update",
      "alias": "servicetype.update",
      "desc": "Cập nhật loại dịch vụ",
      "createdAt": "2023-09-04T11:44:08.514Z",
      "updatedAt": "2023-09-04T11:44:08.514Z"
    },
    {
      "_id": "64f5c30d2c268c9c00c1fde1",
      "name": "servicetype delete",
      "alias": "servicetype.delete",
      "desc": "Xoá loại dịch vụ",
      "createdAt": "2023-09-04T11:44:13.192Z",
      "updatedAt": "2023-09-04T11:44:13.192Z"
    },
    {
      "_id": "64f5c3142c268c9c00c1fde5",
      "name": "combo view",
      "alias": "combo.view",
      "desc": "Xem combo",
      "createdAt": "2023-09-04T11:44:20.360Z",
      "updatedAt": "2023-09-04T11:44:20.360Z"
    },
    {
      "_id": "64f5c3182c268c9c00c1fde9",
      "name": "combo add",
      "alias": "combo.add",
      "desc": "Thêm combo",
      "createdAt": "2023-09-04T11:44:24.698Z",
      "updatedAt": "2023-09-04T11:44:24.698Z"
    },
    {
      "_id": "64f5c31d2c268c9c00c1fded",
      "name": "combo update",
      "alias": "combo.update",
      "desc": "Cập nhật combo",
      "createdAt": "2023-09-04T11:44:29.803Z",
      "updatedAt": "2023-09-04T11:44:29.803Z"
    },
    {
      "_id": "64f5c3222c268c9c00c1fdf1",
      "name": "combo delete",
      "alias": "combo.delete",
      "desc": "Xoá combo",
      "createdAt": "2023-09-04T11:44:34.931Z",
      "updatedAt": "2023-09-04T11:44:34.931Z"
    },
    {
      "_id": "64f5c3282c268c9c00c1fdf5",
      "name": "staff view",
      "alias": "staff.view",
      "desc": "Xem nhân viên",
      "createdAt": "2023-09-04T11:44:40.358Z",
      "updatedAt": "2023-09-04T11:44:40.358Z"
    },
    {
      "_id": "64f5c32d2c268c9c00c1fdf9",
      "name": "staff add",
      "alias": "staff.add",
      "desc": "Thêm nhân viên",
      "createdAt": "2023-09-04T11:44:45.812Z",
      "updatedAt": "2023-09-04T11:44:45.812Z"
    },
    {
      "_id": "64f5c3322c268c9c00c1fdfd",
      "name": "staff update",
      "alias": "staff.update",
      "desc": "Cập nhật nhân viên",
      "createdAt": "2023-09-04T11:44:50.856Z",
      "updatedAt": "2023-09-04T11:44:50.856Z"
    },
    {
      "_id": "64f5c3372c268c9c00c1fe01",
      "name": "staff delete",
      "alias": "staff.delete",
      "desc": "Xoá nhân viên",
      "createdAt": "2023-09-04T11:44:55.606Z",
      "updatedAt": "2023-09-04T11:44:55.606Z"
    },
    {
      "_id": "64f5c33c2c268c9c00c1fe05",
      "name": "manager view",
      "alias": "manager.view",
      "desc": "Xem nhân viên quản lý",
      "createdAt": "2023-09-04T11:45:00.465Z",
      "updatedAt": "2023-09-04T11:45:00.465Z"
    },
    {
      "_id": "64f5c3402c268c9c00c1fe09",
      "name": "manager add",
      "alias": "manager.add",
      "desc": "Thêm nhân viên quản lý",
      "createdAt": "2023-09-04T11:45:04.294Z",
      "updatedAt": "2023-09-04T11:45:04.294Z"
    },
    {
      "_id": "64f5c3442c268c9c00c1fe0d",
      "name": "manager update",
      "alias": "manager.update",
      "desc": "Cập nhật nhân viên quản lý",
      "createdAt": "2023-09-04T11:45:08.610Z",
      "updatedAt": "2023-09-04T11:45:08.610Z"
    },
    {
      "_id": "64f5c3492c268c9c00c1fe11",
      "name": "manager delete",
      "alias": "manager.delete",
      "desc": "Xoá nhân viên quản lý",
      "createdAt": "2023-09-04T11:45:13.153Z",
      "updatedAt": "2023-09-04T11:45:13.153Z"
    },
    {
      "_id": "64f5c3502c268c9c00c1fe15",
      "name": "branch view",
      "alias": "branch.view",
      "desc": "Xem chi nhánh",
      "createdAt": "2023-09-04T11:45:20.792Z",
      "updatedAt": "2023-09-04T11:45:20.792Z"
    },
    {
      "_id": "64f5c3562c268c9c00c1fe19",
      "name": "branch add",
      "alias": "branch.add",
      "desc": "Thêm chi nhánh",
      "createdAt": "2023-09-04T11:45:26.648Z",
      "updatedAt": "2023-09-04T11:45:26.648Z"
    },
    {
      "_id": "64f5c35a2c268c9c00c1fe1d",
      "name": "branch update",
      "alias": "branch.update",
      "desc": "Cập nhật chi nhánh",
      "createdAt": "2023-09-04T11:45:30.520Z",
      "updatedAt": "2023-09-04T11:45:30.520Z"
    },
    {
      "_id": "64f5c35f2c268c9c00c1fe21",
      "name": "branch delete",
      "alias": "branch.delete",
      "desc": "Xoá chi nhánh",
      "createdAt": "2023-09-04T11:45:35.697Z",
      "updatedAt": "2023-09-04T11:45:35.697Z"
    }
```
