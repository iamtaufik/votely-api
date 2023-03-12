# votely-api
Votely adalah sebuah aplikasi berbasis online yang dirancang untuk memfasilitasi dan memudahkan proses voting atau pemilihan secara elektronik. Aplikasi ini dapat digunakan dalam berbagai jenis pemilihan, mulai dari pemilihan di lembaga pendidikan, organisasi, hingga dalam pemilihan umum.

Melalui aplikasi Votely, para pengguna dapat membuat survei, pemilihan atau voting secara online dengan mudah dan efisien. Aplikasi ini dapat memfasilitasi proses pengumpulan suara dan penghitungan hasil secara otomatis, sehingga dapat menghemat waktu dan tenaga dalam proses pemilihan.
## Instalasi

Gunakan [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) sebagai package manager

```bash
npm i --global yarn
```

cek apakah [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) sudah terinstall
```bash
yarn -v
```

clone repository votely-api
```bash
git clone https://github.com/iamtaufik/votely-api.git votely-api
```

pindah ke direktori votely-api
```bash
cd votely-api
```

buat file _.env_ (enviroment variabel) baru dan tambahkan database url anda didalamnya
```bash
DATABASE_URL="your database url"
```

install dependencies yang dibutuhkan
```bash
yarn
```
lakukan perintah berikut untuk membuat schema Prisma baru di database
```bash
yarn prisma db push
```
```bash
yarn prisma generate
```

untuk menjalankan aplikasi lakukan perintah berikut
```bash
yarn dev
```

## Penggunaan
Silahkan gunakan aplikasi Postman atau aplikasi yang lainya untuk melakukan HTTP Request
<h3>Create New Votes</h3>
Gunakan POST method ke url http://localhost:3000/api/votes dan isi body request dengan Json data

```json
{
  "candidates": [
    {
      "name": "Candidate 1",
      "key": 1,
      "title": "Candidate Title 1"
    },
    {
      "name": "Candidate 2",
      "key": 2,
      "title": "Candidate Title 2"
    }
  ],
  "endDateTime": "2023-03-15T00:00:00.000Z",
  "publisher": "John Doe",
  "startDateTime": "2023-03-13T00:00:00.000Z",
  "title": "Vote Title"
}
```

maka akan mengembalikan response berikut

```json
{
  "status": "CREATED",
  "code": 201,
  "result": {
    "id": "640d56ccefbebf2aa21ddfb3",
    "candidates": [
      {
        "name": "Candidate 1",
        "key": 1,
        "title": "Candidate Title 1"
      },
      {
        "name": "Candidate 2",
        "key": 2,
        "title": "Candidate Title 2"
      }
    ],
    "endDateTime": "2023-03-15T00:00:00.000Z",
    "publisher": "John Doe",
    "startDateTime": "2023-03-13T00:00:00.000Z",
    "title": "Vote Title",
    "createdAt": "2023-03-12T04:36:28.317Z",
    "deletedAt": null,
    "code": "CD2A18"
  }
}
```

<h3>Get Votes By Publisher</h3>
Gunakan GET method ke url http://localhost:3000/api/votes dan isi body request dengan Json data

```json
{
  "publisher": "Jhon Doe"
}
```

maka akan mengembalikan response berikut

```json
{
  "status": "OK",
  "code": 200,
  "result": [
    {
      "id": "640c719da4f8f8b1467f20a9",
      "candidates": [
        {
          "name": "Candidate 1",
          "key": 1,
          "title": "Candidate Title 1"
        },
        {
          "name": "Candidate 2",
          "key": 2,
          "title": "Candidate Title 2"
        }
      ],
      "endDateTime": "2023-03-31T00:00:00.000Z",
      "publisher": "John Doe",
      "startDateTime": "2023-03-01T00:00:00.000Z",
      "title": "Vote Title",
      "createdAt": "2023-03-11T12:18:37.928Z",
      "deletedAt": null,
      "code": "BE2VYK"
    },
    {
      "id": "640d56ccefbebf2aa21ddfb3",
      "candidates": [
        {
          "name": "Candidate 1",
          "key": 1,
          "title": "Candidate Title 1"
        },
        {
          "name": "Candidate 2",
          "key": 2,
          "title": "Candidate Title 2"
        }
      ],
      "endDateTime": "2023-03-15T00:00:00.000Z",
      "publisher": "John Doe",
      "startDateTime": "2023-03-13T00:00:00.000Z",
      "title": "Vote Title",
      "createdAt": "2023-03-12T04:36:28.317Z",
      "deletedAt": null,
      "code": "CD2A18"
    }
  ]
}
```

<h3>Update Vote By Code</h3>
Gunakan PUT method ke url http://localhost:3000/api/votes/{code} dan isi body request dengan Json data

```json
{
  "candidates":  [
      {
        "name": "Petter",
        "key": 1,
        "title": "Candidate Title 1"
      },
      {
        "name": "Tony",
        "key": 2,
        "title": "Candidate Title 2"
      }
    ]
}
```

maka akan mengembalikan response berikut

```json
{
  "status": "OK",
  "code": 200,
  "result": {
    "id": "640d56ccefbebf2aa21ddfb3",
    "candidates": [
      {
        "name": "Petter",
        "key": 1,
        "title": "Candidate Title 1"
      },
      {
        "name": "Tony",
        "key": 2,
        "title": "Candidate Title 2"
      }
    ],
    "endDateTime": "2023-03-15T00:00:00.000Z",
    "publisher": "John Doe",
    "startDateTime": "2023-03-13T00:00:00.000Z",
    "title": "Vote Title",
    "createdAt": "2023-03-12T04:36:28.317Z",
    "deletedAt": null,
    "code": "CD2A18"
  }
}
```

<h3>Get Total Vote By Code</h3>
Gunakan GET method ke url http://localhost:3000/api/votes/{code}
<br/>
maka akan mengembalikan response berikut

```json
{
  "status": "OK",
  "code": 200,
  "result": {
    "id": "640d56ccefbebf2aa21ddfb3",
    "publisher": "John Doe",
    "title": "Vote Title",
    "code": "CD2A18",
    "candidates": [
      {
        "name": "Petter",
        "key": 1,
        "title": "Candidate Title 1",
        "votes": 0
      },
      {
        "name": "Tony",
        "key": 2,
        "title": "Candidate Title 2",
        "votes": 0
      }
    ],
    "startDateTime": "Mon Mar 13 2023 07:00:00 GMT+0700 (Western Indonesia Time)",
    "endDateTime": "Wed Mar 15 2023 07:00:00 GMT+0700 (Western Indonesia Time)",
    "createdAt": "Sun Mar 12 2023 11:36:28 GMT+0700 (Western Indonesia Time)",
    "totalVotes": 0
  }
}
```

<h2>Cara Melakukan Vote</h2>
<h3>Create Participant</h3>
Gunakan POST method ke url http://localhost:3000/api/participant dan isi body request dengan Json data

```Json
{
  "email": "dev@dev.com",
  "candidate":"Petter",
  "code": "CD2A18"
}
```

maka akan mengembalikan response berikut

```json
{
  "status": "OK",
  "code": 200,
  "result": {
    "id": "640d6aa5772f5d1cf43ada58",
    "email": "dev@dev.com",
    "participateAt": "2023-03-12T06:01:09.519Z",
    "candidate": "Petter",
    "code": "CD2A18"
  }
}
```

<h3>Get Detail Participant</h3>
Gunakan GET method ke url http://localhost:3000/api/participant/{code} dan isi body request dengan Json data

```Json
{
  "email": "dev@dev.com"
}
```

maka akan mengembalikan response berikut

```json
{
  "status": "OK",
  "code": 200,
  "result": {
    "id": "640d6aa5772f5d1cf43ada58",
    "email": "dev@dev.com",
    "participateAt": "2023-03-12T06:01:09.519Z",
    "candidate": "Petter",
    "code": "CD2A18"
  }
}
```

