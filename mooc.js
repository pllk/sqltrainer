var client_id = "50c4648f34bb075578c383ec62d6908fa49b6986d992c34a2a029be777e0337e";
var client_secret = "d15d4d4ba2b80a91aaff7a5c94d30fe65c87b058991a327a5de4dfe71f7c5576";
var mooc_status = 0;
var mooc_token;

function mooc_login(username,password,callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            mooc_status = this.status == 200 ? 1 : 2;
            if (mooc_status == 1) {
                mooc_token = JSON.parse(this.responseText)["access_token"];
                sessionStorage.setItem("mooc_token",mooc_token);
            }
            callback();
        }
    }
    xhttp.open("POST","https://tmc.mooc.fi/oauth/token",true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("client_id="+client_id+"&"+
               "client_secret="+client_secret+"&"+
               "username="+encodeURIComponent(username)+"&"+
               "password="+encodeURIComponent(password)+"&"+
               "grant_type=password"); 
}

function mooc_logout(callback) {
    mooc_status = 0;
    mooc_token = "";
    sessionStorage.clear();
    callback();
}

function mooc_query(query,callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    }
    xhttp.open("GET",query,true);
    xhttp.setRequestHeader("Authorization","Bearer "+mooc_token);
    xhttp.send();
}

quizzes_tasks = [
["dd24210c-78de-5fda-9e40-1967131575f7","c8a4d00f-dde2-5106-bd9d-f689cf6e73e4"],
["e1c32cc4-c823-5749-b515-460dad847a3d","cdc611fe-23e7-5b7f-8c4d-df150441a1da"],
["98025cff-05a9-55b6-af96-28e90fe5704b","710e5ea4-9091-569a-8aba-31e405eac11e"],
["ac7b4b0b-0a52-5a7f-ace1-1a85bf0c1098","5ab372f9-1c25-5c96-b945-23903ff0f2a1"],
["26ddfc71-2357-5ade-b87f-93127de87485","1fc07e34-a9db-5b8a-ba7b-da145e9dfdd9"],
["7a9961dd-aee9-59b5-9e6d-3ff67545bd4b","d9f55bcc-8bdb-5600-b630-a39a0cd7afe3"],
["10a3fe35-eea0-599a-ada3-003ab04c390f","907e7523-3ba9-5c56-b1d0-e5e74937ea31"],
["d3f801f5-35f9-5762-9ba9-104aecc6846e","2a0b64cd-beac-50cb-8249-29e5eef3ba62"],
["71bebcc4-b8d1-52d5-a25c-c1dae9af5166","c01eb64d-e902-5bec-8c4d-9deddec5e795"],
["1f211d53-1910-5c29-ab7e-e1351acb15e1","c6a0df99-ddc8-58e4-a692-be8221804f34"],
["48daefab-15b8-5268-a470-a8be84294007","a469cd19-7598-5d80-a679-7ef996be80fa"],
["7aaeec9d-6801-536e-9d17-f72f7fedb9ca","df4a2d81-6d38-53ae-8f3c-50c36c300f46"],
["41899033-e3ed-5e90-8351-46656d201d0e","3ba42369-da5f-56e0-b509-8ce3f205b26e"],
["786ed3d8-f1e2-5506-b6e2-f575eda980b4","881f5faa-5205-5ece-8c9c-a836c408ab43"],
["8b63efa8-ab94-5ec2-9cef-16b4eb692d5b","d0d6a87f-70d8-5286-9124-c20a276bebb9"],
["dc9e5a5d-77f2-5d3f-88f8-d029d720acab","7d40a588-1c85-5c13-8c89-4f11a773b1bc"],
["908873e7-18ba-5408-ada9-7be723324644","d43c04d4-b3c5-5203-80c4-e61f37114103"],
["c8b70b2a-4254-5b8f-a153-e6a9a09ec9c1","2cc115c1-d3d9-50d2-b656-757eb7597d2b"],
["59e552b5-953a-50a8-bc27-80495bd090de","4f4801c9-6b12-5e0b-b614-ae94c17c7fa1"],
["edd33193-a1ab-5ad2-bf6a-529b0b3d245e","17320783-900e-5b4a-86c7-33270a88aa1c"],
["6ced746d-6a3c-5c00-bc21-e7fccd2bb4aa","95790ade-8e1f-559b-bc0a-b629d236e17d"],
["e69fb22d-2c01-5c8a-8e10-f3b5ace09938","57cfe673-fd90-5529-871f-c8ad8be9be35"],
["734b10a9-1174-5dbb-877f-7e4ce22c9679","b2ae0d2b-8856-5529-8c7e-1fb47c5cdd15"],
["e0de1489-b38e-5ae9-9cfe-bf8780330c77","7b2e134c-1a1a-51a8-94c7-5e0d7855c79d"],
["4e42edb6-8506-5abe-aa66-0f6cb73027de","3594740c-9775-5c56-ac8b-f4c69359c024"],
["fda8f6d7-cec3-5cbf-ab6d-110cd0f32f58","dba0d412-d0ab-5ea6-9d66-f3eabb46f454"],
["8e7eed3c-1be4-50de-98c2-b8663e6b9503","469febd1-98aa-5e5a-a826-a83185cb3d67"],
["cb159b33-c5d9-5028-adfd-3f321d8fa386","05b82098-4616-516d-980a-861ae18365f9"],
["efd685b2-d299-5b3e-87a7-5dbb5486b4ae","93a4a70c-a023-5988-a491-2b6e7057a8a5"],
["df415807-88f3-5d11-99de-2c4e08ef10c6","656d3fa1-401a-507b-a5c2-ce662e7a9b16"],
["150d5baa-36fd-59ef-ae51-43025cdf9ef1","2869991a-ba3b-51ea-b2fa-2db1aa925013"],
["9d339782-0994-5358-a544-04ac20d7030d","99f40aad-9820-5853-9415-f66ad6b5d7e6"],
["c9ca94f2-d440-505f-af8f-1412e7d194bf","0db54675-15bc-523b-bb85-331d7bda03e0"],
["3c4325f7-7d80-5db4-ac6d-cac5f654b80d","5451a4b8-1768-5115-a6b4-13e90b8e76e4"],
["b1c6971c-e1a6-5f7d-bb5e-d09a0a86ea3d","ba3922af-24c9-5761-9318-c0dea7383ea8"],
["6dea6120-6653-58e2-899f-2c4f8b71770f","68595a4f-6293-58ca-a13f-06b1e423a495"],
["17116f4a-25a1-5efd-980d-04f4b27153d2","ef758140-b5ea-59f2-ab02-f5bf3f53421b"],
["a4d8f2a1-f979-5dec-9a8d-d13c8c73f72a","9ca7c7e6-734b-54df-afb5-a51c4d77ab22"],
["a03fe65f-c24c-5375-ad51-5d765484a950","efb33cf2-4fae-5315-83c4-dc17e1521ed2"],
["a3b3eec2-2fe3-5c00-a155-324701eb7bce","9f3abdf2-5607-5d1d-9980-5431c3b9d62e"],
["0a295f29-0b59-5275-8166-fd77644bb954","b92d8cd6-3e4c-500f-828f-aa862a3466a2"],
["c0758038-d4a6-5d28-bf60-dc1df083c0fb","ce7bb364-be26-52d0-8742-1b2b9cc130e9"],
["dc23d927-0c86-59f0-91c5-3e57380880b1","64997619-4914-5520-9483-c2be9d2da95b"],
["76b832c4-da1e-54b6-bdc0-f1b6c8fecf4b","db23a82d-021d-54f5-99e2-2d2cbabc9b0b"],
["4aeef022-5f57-5dec-bed9-ad443769b5b0","9a5d9627-8c37-5cc0-bd24-ed6c6e2b1d4f"],
["eada0ddd-b1af-5af8-a645-23c119601c4e","4c68b464-b98d-5f89-a0e8-e0b656a56451"],
["646f58a7-2d0d-5ef7-8268-2ff241626552","a96d61a4-232b-58b0-a8bc-f9eb99baa209"],
["0abde0ef-81cf-5619-a99d-c3e3032f2086","9e07336c-277d-5b5e-b5c4-09828ff03ed0"],
["fdf18c72-1670-5ff1-8a4a-edca14067e60","0b141561-10c7-51ca-a6de-0bed180801f7"],
["4ce40b9a-1bd9-5b6d-9f42-7b00d93a539b","d36f8135-53ce-5314-9c52-fa41d280e509"],
["4e4b83cf-1220-5999-afec-d2fdf2679c44","4e913667-2007-5d89-8be4-722d5276e1db"],
["84728295-5e16-517a-bf6f-ef03326229d1","4dec5ebc-453c-5ea5-9586-4efc390d386d"],
["80477d6b-0f87-5b07-b2da-97c1141aa12a","3d6c74c3-c7ce-5f6d-9702-8dae3e33f2ad"],
["e5563175-b5c8-5e3c-b82f-344c810e38bd","e575773c-2b23-54ee-b805-33b90eb1cae4"],
["36688a82-d812-55c2-838f-2cd2d6f945a3","3e28e117-ea1c-50a7-9047-ffdea9763348"],
["e6107576-4227-54e9-80e2-0543d07d23ff","e7dcf018-f0d4-5c7c-8f0e-c7d3eea65a46"],
["1752fada-2460-5880-9ef7-6825f4401be8","f2693262-0465-5273-a87a-f921a6e695aa"],
["61fed148-58b0-5fc9-b871-c222247e485b","367842c9-1196-51db-9fc5-222f874d78d2"],
["186c1516-9f17-5784-96c9-aa832fb93381","b215b218-d14e-536c-b29b-f3feadd8faf3"],
["68015737-6473-5ae9-9442-fcbef9139c5d","48c41492-ba0d-5fc9-8862-dca3e4cd83ab"],
["dbece5be-dc4a-5708-9551-9f47ff9ab291","ca39352a-0834-51fa-b106-319f1a26d1c7"],
["bf86cb76-a45c-5ce6-bff3-0eb7e26bda3e","c78ff95d-d948-5a98-be93-8b87b60e11b4"],
["a7a739c6-95e1-5608-b3c9-3d143b9082fb","3b3159da-c97f-5c02-af74-8370a2ddbd05"],
["9804090b-e74a-5f22-89ae-5891ac0f643a","bb497367-aea0-5d83-ad2f-d736bd66786c"],
["ce138cc0-f176-5155-a602-668b328f7e79","5538597a-58b4-50ca-8c1e-9ac21422945f"],
["9d80164f-b188-5270-8a02-53e85625965c","8d61a397-7633-5d53-810a-8a27ca08c586"],
["e264f926-58a6-5693-8306-1dbf7f57bc59","80c22c6a-71f8-5ce5-9655-e8c262a9dc3a"],
["83d28343-d40f-54be-899c-8843da95ff87","b8107272-760c-5058-b8a9-fb47339f2d69"],
["edda5a17-93b9-5986-a805-5b26f0c13e4a","33b3e9df-bc6f-5d57-a9c5-50b414c5174e"],
["7f4ef53a-4661-5229-af89-4df09da050c1","bb6ef41c-f680-5031-bae8-56059bbd6d4e"],
["bd8be9a3-71e4-5f74-8f65-d0edbe54ccb0","ccaef874-cd3e-5e46-8f23-896749c29d3b"],
["1a86d291-ad9a-59f7-bc5d-6643ce12be79","933d5f84-32c8-5844-b2c0-2e7535eb1cb0"],
["caf912bd-2e59-5480-8a4d-ffe3434bbb14","96a3f90b-397a-5d96-bca1-1d8140c10a8e"],
["cff0a229-a726-58df-82ca-70e10f1df968","73f67c26-472d-570e-b88a-a3ed914bf549"],
["916d0708-1e25-5e1b-b6c1-485bf27b67cd","aed52faf-cd73-54dc-a758-b277b9cbc910"],
["b2aa2dfb-09e7-59aa-a298-4deaaff07af4","fa6b7e53-d1de-5cb2-844d-32890024894d"],
["7bd410a4-609e-54bb-8fc6-fda1cfdbee7a","2e1bab91-35b0-5a37-ab01-4a610f6d0e44"],
["c1045d7e-252e-53a7-994e-a0c3372f2fbd","6e44004f-48ac-5d7d-be51-42ec65897c31"],
["9c0fc59d-8f8d-54e9-addd-1bf330badb1f","ee6a7725-e66a-5aeb-a32b-118604abe558"],
["2f602625-faed-580e-8ce9-49063503e529","c3fb13ce-dc4c-5a0b-9827-f31cbc18e1c9"],
["ed118836-4d1a-553c-9e97-536584d7996b","ec7acbb6-489c-581a-938d-efcadba39019"],
["fab1f85d-bc3a-5a7b-b41d-37f2c2a4bffc","e39a385f-d680-5e12-b01e-86f0856562c6"],
["e7610b5b-ef55-586d-9be5-1b1dc08f11d2","2142a2d8-b6f1-5880-aae0-bbe2fd05df8b"],
["ae2d8a4c-67ed-5957-af53-f8fd99a7e063","04d4a08f-d9d3-5b57-9895-99bc2237d37a"],
["65431237-0775-5ce9-a4d9-6fd087da5e00","98c89f4a-1227-5239-807c-a8f7d0dfa810"],
["fd09b46a-b4ab-5152-8a39-6db452c92a31","470b11c0-2ec2-52f5-8a43-5b7430c7aa31"],
["06378d3f-90c6-5e60-9f2e-55ae94e8dd70","fbdaf5c2-2263-56e7-a91c-0793a065e4d9"],
["89d01cd7-d8af-5f0a-a903-7f60e80e0220","7a2efe5f-f1bc-592a-af50-5f4baf818b6d"],
["0c686d09-02d4-5e51-8844-9775fa4105c7","47bff238-72c8-53ee-ac21-f80fbe38add1"],
["ba99aff9-ffad-5615-aff6-8214f12e263d","cb27663d-c927-5515-acff-26ea4b36498b"],
["a77efd21-5918-5e89-9fb2-bb4fb1f02803","1dca4e86-92e9-5112-90bf-308f15a86d25"],
["4d2cda00-c772-52ba-a4ed-051b3645c591","1f242540-7249-59c7-b9b1-16c9cbe262b5"],
["6fbcf904-edaa-58dd-9fbf-46044edebdbb","f522d83a-cb36-52d9-9d5c-ce8b98ca10f0"],
["33d181f5-d5ba-5474-bedf-61ab33ac98fa","0bf8f7a1-ed7b-53eb-a99c-afd9f3f40036"],
["ec39bcfb-2f61-5d4d-a2ec-b9ff130ba280","f7de9b34-1fa1-5f2d-87a2-13eaf0e52516"],
["71586bbb-ea5d-5563-8e69-aa73232bf4c0","7be8cdb0-6fe3-5a96-bdb7-34af0d68761d"],
["2c8a63be-6f73-5310-80a6-9b61864e733e","d27803a6-85a7-5099-9ce9-47fcffa8f47a"],
["de7464d6-b74f-5a7d-9614-8ba5ae47dd6f","51d87bbb-8787-562c-8897-e3f1f7ef4791"],
["c9722ecc-f190-5f9b-8838-f38d30392ae1","8bedf26f-709e-5cff-b463-f389821ae710"],
["0bd8aa0a-1cef-506f-b1c0-9a6423dae869","ca477d02-889b-580f-a5a7-3ff34771eb91"],
];

function quizzes_status(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    }
    xhttp.open("GET","https://quizzes.mooc.fi/api/v1/quizzes/answer/answered/4b972714-7af7-4252-937c-d4bc9bad6c1e",true);
    xhttp.setRequestHeader("Authorization","Bearer "+mooc_token);
    xhttp.send();
}

function quizzes_send(task,sql,result,callback) {
    return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback();
        }
    }
    xhttp.open("POST","https://quizzes.mooc.fi/api/v1/quizzes/answer",true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization","Bearer "+mooc_token);
    data = {
        "quizId": quizzes_tasks[task-1][0],
        "languageId": "fi_FI",
        "itemAnswers": [{"quizItemId": quizzes_tasks[task-1][1],
                        "textData": sql,
                        "correct": result,
                        "optionAnswers": []}]
    };
    xhttp.send(JSON.stringify(data));
}

function quizzes_answer(task,callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    }
    xhttp.open("GET","https://quizzes.mooc.fi/api/v1/quizzes/"+quizzes_tasks[task-1][0],true);
    xhttp.setRequestHeader("Authorization","Bearer "+mooc_token);
    xhttp.send();
}

if (sessionStorage.getItem("mooc_token")) {
    mooc_status = 1;
    mooc_token = sessionStorage.getItem("mooc_token");
}
