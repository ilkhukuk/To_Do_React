# A. KURULUM
# a. Vite kurulum
1. terminale npm create vite yaz
2. sonra ekrandaki komutları izle

# b. Json-server kurulumu
1. Json-server node.js yüklü değilse ternminele <npm install -g json-server> yaz.
2. src dışına bir adet db.json dosyası oluştur. bu API için
3. db.json dosyasına bir json örneği yap
4. örnek bir obje ile başlar içinde bir "todos" başlıklı bir dizi oluştur.
5. json {[{}]} şeklindedir.
6. dizi içerisine id-title-isDone-date içeren objeler oluştur.
7. Json dosyasını API gibi kullanmak için package.json dosyası içerisinde script olarak ekle
8. "server" : "json-server --watch db.json --port 6060"
9. server ismi herhangi bir isim olabilir. 
10. json-server ama bunu yazılmalı json olduğunu söylüyoruz.
11. --watch db.json diyerek db.json izle diyoruz ve apıyi 6060 portuna alıyoruz. port sana kalmış (çakışma olmamalı)
12. terminal aç ve "npm run server" (server bizim verdiğimiz isim) yaz. arka planda server komutu çalışacaktır.
13. Bu API üzerinden çalışacağız

# c. Axios kurulumu
1. Bu projede axios kütüphanesini kullanacağız.
2. Bu kütüphane vite olmadığından terminale <npm i axios yaz.
3. Sonra kullanmak istediğin yere import et 

# d. Boostrap
* Boostrap cdn deki styling deki min.css bağlantısını index.html ye yapıştır.

# e. Diğer
1. Boostrap kullanacağız. app.css sil- tüm importları
2.  app.js içini temizle - tüm importları - app.css sil
4.  index.css sadece body kalsın body içerisinde de margin ve height kalsın. color beyaz - bg-#242424 olsun
5.  index.css ile css yapılacak

# B. İNŞA ETME

# a. İlk Html
1. app.jsx dosyasına bir div oluştur ve içerisine h2 etiketi ve bir form alanı oluştur.
3. form a onSubmit ile handleSubmit fonksiyonu tanı
4. return satırının dışına handlesumbit fonksiyonunu bir değişkene ata 
5. <const handleSubmit () => {}
6. formun içerisine bir tane input ve bir de Ekle için button ekle

# b. API den axios ile veri alma
1. apı dan verilere erişmek için app.jsx de veri çekme isteği yapılacak bunu hem fetch hem de axios ile yapabiliriz. burda axios kullanılacak
2. useeffect kullanılacak. 
    -useEffect, React'ta işlevsel bileşenlerde yan etkileri (side effects) işlemek ve belirli yaşam döngüsü olaylarına tepki vermek için kullanılan bir Hooks fonksiyonudur. useEffect, işlevsel bileşenlerde veri alma, güncelleme, abone olma, temizleme gibi işlemleri gerçekleştirmek için kullanılır. Yan etkiler, örneğin API istekleri yapmak, DOM manipülasyonları yapmak, abonelikleri yönetmek veya bileşenin durumunu güncellemek gibi işlemleri içerebilir.
    -bu hook fonksiyonunu Json dan veri çekmek için kullanacağız.

3.  useeffect i kullnamk için react kütüpanesinden import etmeliyiz.
4.  component olmadığı için {} kullanılacak 
5.  <import {useEffect} from 'react';
6.  sonra return dışına useEffect fonksiyonunu yazılacak /
7.  <useEffect (() => { fetch ('api adresi').then ((res) => res.json()).then((data) => console.log(data))}) bu fetch yapısı
8.  ama biz axios kullanacaız
9.  axios json çevirmeyi otomatik yapar. Daha az kod yazmamızı sağlar
10. <!--!--> axios fetch farklı - axios da get - post - put - delete yöntemleri ile birlikte kullanılır. yani axios.get() şeklinde kullanımı bu şekildedir. Bunlara yöntem deriz. yani axios.get() axsios kütüphanesinin bir yöntemidir

11. <!--!--> useEffect (() => ) Bu hook fonksiyonu olduğu için ilk parantezi koyuyoruz. İkinci parantez ise fonksiyon içinde başka bir fonksiyon çalıştıracağımızı söylemek için => ise fonksiyonu çağırmak için

12. <useEffect (() => {
        axios.get('api url adresi' / tırnak içerisinde yaz - http://localhost:6060/todos)
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error) )       
        }, [])
                -Gelen veriyi json a çevirmeye gerek yok direk veriye ulaşabilir.(res.data) 

13. Axios un yapacağı istekleri baseUrl ile tanımlayabiliriz.
14. Bunun için function App() dışında bir yere;
15. <axios.default.baseURL='http://localhost:6060'/ şeklinde tanımlama yapabiliriz.
    -Burada default axios un varsayılan ayarlarına ulaşmamızı sağlar. 
    -baseUrl ye de temel url yi yazmamız yeterlidir.
    -Artık;
    <axios.get('/todos') / yapmamız yeterli olacaktır.

16. axios a ayrıca zamanaşımı da ekleyebiliriz. Belirlediğimiz ms cinsinden zaman dolar ise bu durumda hata -catch çalışır. /axios.get('/todos', {timeout: 5000})/ gibi ama bizim kullanmamıza gerek yok. Çünkü json verisini internetten almıyoruz. Nesnenin (obje) bir parçası olduğu için {} içerisine timeout yazıyoruz..

# c. Apı den gelen veriyi ekrana basma

1. Ekranda arayüze aktaracağımız bir şey varsa useState hook fonksiyonunu kullanmalıyız.
2. return dışında useState hook yazalım.
3. <const [todos, setTodos] = useState(null)
4. axios ile apiden alınan data setTodos ile state ye gönderilecek. Böylece todos u güncellemiş olacağı. Todos un ilk değeri null iken artık res.data olacak
5. <then((res) => setTodos(res.data))
6. form etiketinin altına ul etiketi eklenecek. burada to do lar yer alacak daha doğrusu apiden gelen verilen buraya basılacak. ama bunun için map kullanmamız gerekli, çünkü her veriyi ayrı ayrı alıp ekrana basacağız.
7. li etiketlerini map ile ayrı ayrı basacağız.
8. Ama önce todos un ilk değeri null olduğundan dolayı bir koşul oluşturmamız gerekli
9. todos değeri yoksa (yani null ise) ozaman ekrana yükleniyor yaz varsa ul eiketini map ile bas diyeceğix.
    
    {!todos && '<h3>Yükleniyor...</h3>'}
    
    bu kod todos yoksa şunu yap demek - sonra altına;
    
    <ul>{todos?.map((todo) => {<li>{todo.title}</li>})}</ul>

    - ? işareti, todos dizisi tanımlı değilse map işlemini engellemek için kullanılır ve böylece hata oluşmasını önler.
    
    <!--!--> Buradaki ? koşullu zincirleme (conditional chaining) todos? - todos varsa demek yoksa  engeller.
     
10. li etiketlerini ayrı bir component de düzenleyelim. bu üzden bir conponent klasörü oluştur. ListItem.jsx adı olun
11. içi ; todo props sunu göndereceğiz. {todo} yerine props diyebiliriz. ama aşağıda props.todo yazmamız lazım uzun olduğundan sadece{todo} yapıyoruz.

    const ListItem = ({todo}) => {
        <li className="list-group-item d-flex justify-content-between align-item-center">
            <div className="d-flex gap-1">
                <input checked={todo.isDone} type="checkbox" className="form-check-input"/>
                <span>{todo.isDone ? 'Tamamlandı' : 'Devam ediyor'}</span>
            </div>
            <span>{todo.title}</span>
            <div className="btn-group">
                <button className="btn- btn-info">Düzenle</button>
                <button className="btn- btn-danger">Sil</button>
            </div>
        </li>
        }

12. App.js de map metodunun içine <ListItem /> yazalım. Ama bir key değeri ve todo prop unu gönderelim. Key değeri oraya gönderdiğimiz todo içindeki key / <ListItem key={todo.id} todo={todo}/> /

# d. Silme
1. Silme işlemi aslında json da bizim tarafından oluşturduğumuz objenin silinmesi demek. json dan çıkarma işlemini axios un delete yöntemi ile yaparız. delete yönteminde bizden iki şey istiyor. bunlardan birincisi verinin hangi url de olduğu ikincisi ise hangi objeyi sileceği. objeleri birbirinden ayrıt etmek için id numarası verilmişti. bu nedenle silinmesini istediğimiz objenin id sini de belirtmemiz gerekecek. 
   - Silme işlemi ilk önce sil butonuna bastığımızda devreye girecek. 
   - sil tıklandığında silinmesi için bir fonksiyon çalışmasını sağlayacağız. fonksiyonda da axios.delete yöntemi çalıştırılacak

2. <button onClick={handleDelete} className="btn- btn-danger">Sil</button> sonra return satırının üstüne bir yere handleDlete foksiyonunu 
3. <const handleDelete = () => {axios.delete(`/todos/${todo.id}`)}
4. bu fonksiyonun çalışması için ListItem.js ye axios kütüphanesinden axios u import etmemiz gerekli
5. <import axios from 'axios'>
6. Böylece sil butonuna tıklandığında jsondaki obje silinir. Ama sadece json da silinir. Ekranı yenilersen gider ama bunu otomatik hale getirmeliyiz. bunun için useState güncellememiz lazım.
7. ÖNEMLİ = HER API GÜNCELLENDİĞİNDE USESTATE DE GÜNCELLENECEK ALTIN KURAL
8. useState yi güncellemek için ListItem a App.js den props olarak değerlerini göndermemiz lazım
9. <ListItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
10. şimdi bu propsları ListItem a da tanıtalım
11. <const ListItem = ({todo, todos, setTodos})
12. Sil butonuna tıklandığında sadece Json da silindi. ekranda duruyor. peki neden. çünkü ekrandaki görüntü useState de olan objelerdir. bu durumda useState de hala silinen obje duruyor.
    
13. <!--!--> ÖNEMLİ - useState den bir şey silmek için filter metodunu kullanırız.
    
14. filter ile aslında silme yapmıyoruz. Sadece silinen objenin id si dışındaki diğer objeleri almak için  filter a vereceğimiz değerin id si silinen objenin id eşit olmayanları al diğerlerini alma diyoruz. Filtreleme ile oluşturduğumuz bu yeni diziyi bir filtered değişkenine atıyoruz. sonrasında bu değişkeni useState ye set ediyoruz. Böylece state yi güncellenmiş oluruz.
15. <.then(() => {const filtered = todos.filtered((f) => f.id !== todo.id)
    <setTodos(filtered)})

# e. Ekleme
1. Ekleme ilke önce ekle butonuna basılması ile tetiklenecek. form a onchange  ile handleSubmit fonfsiyonunun çalışması için kod yazmıştık. şimdi bu fonsdiyonu çalıştıralım.
2. inputa bir veri girdğinde enter a basılınca bu veriyi db.json a aktarmamız sonrasında ise ekrana otomatik olarak gelmesi için state yi güncellememiz gerekli
3. ilk aşama db.json a gönderme. inputa girilen veriye id ve isDone ile tarih bilgisi de eklemiz gerekli bu bir obje olduğundan handleSubmit fonksiyonu içerisinde bir obje tanımlamamız gerekli
4. <const handleSubmit = (e) => {
        const newTodo = {id: new Date().getTime(), title: e.target[0].value, isDone: false, date: newDate()}}

5. <!-- ! Bu objeyi API göndermek için axios un POST yöntemini kullanacağız -->
   
6. <const handleSubmit = (e) => {
        <!-- forma onSubmit özelliği vediğimizden sayfanın yenilenmesini engellememiz gerekli-->
        e.preventDefault(); // Tarayıcının varsayılan davranışını engeller
        <!-- eklenecek veri iiçin obje tanımlama -->
        const newTodo = {id: new Date().getTime(), title: e.target[0].value, isDone: false, date: newDate()}
        <!-- veriyi db.json a gönderme -->
        axios.post('/todos', newTodo);
        <!-- state yi güncelleme -->
        .then (() => setTodos([...todos, newTodo]))
        <!-- inputu temizleme -->
        e.target[0].value= ""
        }

7. setTodos içinde önce eski state deki  todos u aynen alacağı. Sonra newTodo ile oluşturulan objeyi ekleyeceğiz. bu yeni oluşan json dizisini de useState ye set ediyoruz. 
   
8. <!--!--> Dikkat edilirse setTodos içince [ ] kullandık. çünkü yeni bir dizi gönderdiğimizi belirtmiş olduk

9. sayfanın yenilenmesini engellememiz gerekli <e.preventDefault la

9.  Son olarak inpu içini temizleme var. bunun için value değerini boş string yapmak yeterli

# f. İnput boş ise uyarı verme
1. input a hçbir şey yazılmadan ekleye tıklandığında yukarıdaki çalışması gerekli hiçbir fonksiyon çalışmaması gerekli ve uyarı vermesi gerekli
2. uyarıyı React-toastify ile yapacağız. hatta eklendi, silindi, düzeltildi uyarılarını bununla yapacağız.
3. bunun için ilk önce terminale
4. <npm install --save react-toastify> yaz
5. sonra kullanılacak dosyaya import et
6. <import { ToastContainer, toast } from 'react-toastify';>
7. Ana fonksiyon dışına importların altına <import 'react-toastify/dist/ReactToastify.css';> ekle
8. Son olarak ana div in en son kısmına  <ToastContainer /> ekle
9. şimdi imput boş ise handleSubmit fonksiyonunun çalışmamasını sağlamamız lazım. ise dediğimiz için if kullanmamız gerekli
10. <if (e.target[0].value === "") => {
        toast.error('Lütfen formu doldurun.. ', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        return;
        };

11. return ile handleSubmit foknsiyonu çalışmaz.

# g. Checkbox aktif etme (isDone) 
1. Todo listesindeki yapılacakların tamamlandı tamamlanmadı ksımını yapmamız için ListItem.js deki li etiketinin içerisndeki checkBox özellikli input onChange ekleyeceğiz. Bununla handleChange fonksiyonunu çalıştıracağı.
2. Şimdi ekranda map ile oluşturulan listeye tıklanacapından todo nun isDone değerini false den true çekeceğiz. Şimdi json dizisi içindeki bir objenin de içindeki isDone değeri güncellenecek Dikkat edilirde sadece bir eleman değişecek 

3. <!--!--> State yi güncelleme axios un put yöntemi ile yapılır.

4. önce todo içindeki isDone değerini tersine (çünkü bir daha tıklandığında bu defa false olacak her tıklandığında değer ters olacak) çevrilecek sonra bu değer stateye aktarılacak. zaten axios.get ile sayfa değişir.

5. <input onChange={handleChange} checked={todo.isDone} type="checkbox" className="form-check-input"/>
6. sonra return dışına fonksiyonu tanımlama
7. <const handleChange (e) => {
        <!-- isDone değerini tersine çevirme ve bunu değişkene atama-->
        const update = (...todo, isDone: !todo.isDone)
        <!-- yukarıda önce map in todo sunu tamamen alıyoruz. sonra içindeki isDone ı eskisinin (todo.isDone) tersine eşitliyoruz. -->
        <!-- sonra axios.put ile state yi güncelliyoruz -->
        axios.put(`/todos/${todo.id}`, update)
        <!-- yukarıda todo ile aynı id ye sabip todos a gidip o objeyi update ile değiştiriyoruz. işte bu kadar-->
        <!-- yukarıda json u güncelledik şimdi de state yi güncelleyelim. -->
        .then(()=> {
            const filtered = todos.map ((item) => item.id === update.id ? update : item)
            setTodos(filtered)
        })
    }

8. then den sonraki kısımda map metodunu yeniden tanımladık. burada todos un her bir elemanına item dedik ve item ın id si update edilen objenin id si ile eşleşirse o zaman update i gönder değilse itemin kendisini gönder dedik. sonra state set ettik. Böylece güncelleme tamam. ilk yazdığımız map ile güncellenmiş todo lar ekrana basılacak

# h. Düzenleme
1. Düzenleme butonuna tıklandığında title düzenlemek için birden fazla yöntem kullanabilir. örneğin düzenlemeyi yeni bir modal da yapabiliriz. bunu crudapp yaptıkç. şimdi düzenle butanuna tıklandığında ekranda title olduğu yerde yapabiliriz.
2. Düzenle butonu her iki yöntemde de açma kapama butonu olarak kullanılır. Bu durumda bizim true ve false durumlarını bir state ye aktarmamız gererkli. bu state sadece açma kapama için olacak düzenleme için ayrı bir state yapılmalı. adım adım yapalım
3. öncelikle açma kapama state yapalım
4. <const[isEdit, setIsEdit] = useState(false) // ilk durumu false olacak düzenleye tıklandığında true olacak
5. düzenle butonuna onclick verelim. onclik ile setIsEdit i tersine yani !setIsEdit çevirelim. Daha doğrusu state setIsEdit in tersi değirini set edceğiz. Çok basit fonksiyonla bunu yapabiliriz.
6. <onClick= {() => setIsEdit(!setIsEdit)} // düzenle butonuna tıkladığımda false true tekrar tıkladığımda true false dönecek
7. şimdi listedeki title kısmı önceden sadece span dı şimdi input da olacak. bu durumda setIsEdit değeri true ise input false ise span gelecek. bunu Ternary Operatörü (Üçlü Operatör) ile yapacağız
8. {isEdit ? (input) : (span)} // isEdit değeri olumlu yani true ise input değilse span olacak 
9. inputa da listedeki title value değeri olsun Bunu bşaangıç değeri olarak almak için defaultValue özelliğini kullanacağız. Default değer map in todo içindeki title olacak
10. {isEdit ? (<input className="form-control shadow" defaultValue={todo.title} />) : (<span>{todo.title}</span>)} //span artık bu şekilde olacak
11. inputa yeni veri girildiğinde bunu onaylıyıp state göndermemiz gerekli state sadece title güncellenecek
12. şimdi onay ve vazgeç butonu da eklememiz gerekli
13. <button className="btn- btn-info">Düzenle</button> değiştiraceğiz bunu onayla yapacağız;
14. <button className="btn- btn-info">{isEdit ? "Onayla" : "Düzenle"}</button> // ama bunu bu şekilde yazarsak onclick özelliği veremeyiz bu sebeple ayrı ayrı yazalım
    
15. {isEdit ? (<button onClick={() => {handleEdit(); setIsEdit(!isEdit)}} className="btn- btn-success">Onayla</button>) : <button onClick= {() => setIsEdit(!setIsEdit)} className="btn- btn-info">Düzenle</button>}
    
16. hemen bunun üstüne de bir koşullu buton satırı ekleyeceğiz
    
17. {isEdit ? (<button onClick= {() => setIsEdit(!setIsEdit)} className="btn- btn-secondary">Vazgeç</button>) : ()} //01:54:00 de
    
18. ListemItem içinde return dışına handleEdit fonksiyonunu yazalım. bu fonksiyon inputa girilen değeri önce json gönderecek buradan da state güncelleyecek. 
    
19. <const handleEdit = () => {}
    
20. <!--!--> burası çok önemli - inputta girilen yeni değeri useRef hook kullanacağız. Bu hook React bileşenlerindeki DOM öğelerine veya diğer değerlere erişmek için kullanılan bir hook'tur. genellikle DOM manipülasyonları, animasyonlar, odak yönetimi ve React bileşenlerindeki özel durumları ele almak için kullanılır.

21. useRef i import edelim 
22. sonra inputa bir referans verelim aşağıdki kodu onaylaya ekliyoruz;
23. <ref={inputRef}
24. return dışına hook kullanlam için belirlediğiz refaranda atayalım
25. <const inpurRef = useRef();
26. inputa girilen yeni datası artık input.current.value içinde yer almakta, json objesinin title artık günceleye biliriz. yukarıda change yapıtığımız aşamalar aynı
27. önce objenin kopyasını oluşturu. title değiştireceğiz
28. <const updated = {...todo, title:input.current.value}
29. jsona aktarma yapalım
30.  axios.put(`todos/${updated.id}`, updated)
     .then (() => {
     const filtered = todos.map((item) => item.id === updated.id ? updaded : item)  
     })
     setTodos (filtered) // state güncelleme
     setIsEdit (false)   // onay ve vazgeç butonunu kaldırma
31. buraya kadar bir inşa edelim.

# C.JSON-SERVER ÖZELLİKLERİNİ KULLANMA
* postman uygulamasını kullanarak json-server özelliklerini kullanacağız.

# a. Limit ve sayfa özelliğini kullanma
1. Postman uygulamasında GET ile API adresini giriyoruz. 
2. Alt tarafta _limit ve _page key değerlerini giriyoruz.
3. sonra ekrana ileri ve geri butonlarını ekliyoruz
4. Sayfaya sayısını takip etmek için sayfayı state atamalıyız.
5. <const [page,setPage] = useState(1)
6. ileri ve geri ile sayda sayısını gösteren divi ekle
7. ileri ve geri butonlarına tıklandığında artma ve zaltma ekle
8. geributonuna 0 altına inmesi durumunda disable olmasını ekle
9. limit ve page özelliğini bir değişkene ata ve bu değişkeni apıye gönder
10. <!-- ! API ye params ile göndereceğiz--> ve useEffect en sondaki [] kısma page ekleriz
11. max page sayısını nasıl buluruz. console.log(res) yazdığında burada bir x-total-count yer alıyor. bunu matematiksel işlemden geçirdik mi tamam
12. şimdi ileir butonuna disable yapılır.

# b. silme ve ekleme durumunda sayfa güncelleme
1. Eğer ekrtandaki liste 4 geçerse bir sonraki sayfaya geç 03.00.00
     




        



