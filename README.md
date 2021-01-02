# SBox Image Encryption
<a href="https://hsndmr.github.io/sbox_image_encryption/">DEMO</a>
<br/>
<br/>
SBox Image Encryption, Bir görüntüyü, belirtilen parola ile s kutuları oluşturarak yeni bir şifreli görüntü elde eder. Yeni şifreli görüntü, aynı parola kullanılarak tekrar eski haline getirilir.

# Pseudo Random Number Generator (PRNG)
Sözde Rastgele Sayı Üreticisi (PRNG), rastgele sayıların dizilerini üretmek için matematiksel formüller kullanan bir algoritmayı ifade eder. PRNG'ler, rastgele sayıların özelliklerine yaklaşan bir sayı dizisi oluşturur. PRNG kullanarak rastgele bir sayı oluşturmak için başlangıç değeri gereklidir. Bu başlangıç değerine göre hep aynı sayı üretilecektir. Bu başlangıç değeri ile şifreleme işlemi yapılırken üretilen değerler ile deşifreleme yapılırken üretilen değerler aynı olduğundan dolayı herhangi bir veri kaybı olmayacaktır. 

# Secure Hash Algorithm (SHA)
Bugüne kadar en yaygın olarak kabul edilen hash fonksiyonu, 1993'te tanıtılan Amerikan federal standardının gözden geçirilmiş bir versiyonu olan SHA-1'dir (Secure Hash Algorithm 1). Bu işlevin orjinal hali olan SHA, Ulusal Güvenlik Ajansı (NSA) tarafından geliştirilmiştir ve açık araştırmalarda herhangi bir zayıflık bulunmadan önce bile, daha fazla güvenlik için 1995'te revize edilmiştir. SHA algoritması, uzun bir girdiyi alarak, sabit uzunlukta bir çıktı üretir. Her zaman aynı girdiye karşılık, aynı çıktı üretilir. Bu çalışmada, SHA algoritması, S-Kutusunun üretilmesinde kullanılır.

# Dinamik S-Kutusu Üretimi
Bir S kutusu, 16x16 boyutunda ve 256 tane farklı sayıdan meydana gelen bir matristir. Bu çalışmada, kullanıcı bir görüntüyü şifrelemeden önce bir değer belirlemesi gerekir. Bu değere göre dinamik olarak S-Kutusu üretilir. Kullanıcının belirlemiş olduğu değere göre sırası ile aşağıdaki adımlar uygulanarak S-Kutusu üretilir.

# SHA Algoritması İle S-Kutusu Üretimi 
Başlangıçta 16x16 boyutunda 0’dan 255’e kadar sayısı dizisi S-Kutusuna yerleştirilir. Şekil 1.0' da gösterilmektedir. Kullanıcının belirlemiş olduğu başlangıç değeri ile, SHA fonksiyonu kullanılarak 1024 bit uzunluğunda bir sayı dizisi oluşturulur.

![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/image-1.png)
<br/>
Şekil 1.0
<br/>
<br/>
SHA fonksiyonu ile oluşturulan 128 karakter uzunluğundaki değer ile S-Kutusundaki satır ve sütunlar Şekil 1.1’ deki akış diyagramına göre yer değiştirir.
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/image-2.png)
<br/>
Şekil 1.1
<br/>
<br/>
Şekil 1.1' deki akış grafiğini kullanarak S-Kutusu oluşturalım. Kullanıcı “123456” değerini girdiğini varsayalım. “123456” değerinin SHA-512 çıktısı “ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413” olur. SHA-512 çıktısını kullanarak S-Kutusundaki satır ve sütunları yer değiştirelim. SHA-512 çıktısı 128 karakter uzunluğundadır ve 32 defa satır ve 32 defa sütun yer değiştirir. SHA-512 çıktısı hexadecimal değerlerden oluşmaktadır. Yer değiştirme işlemi yapılmadan önce decimal değerlere çevrilir. İlk önce b.ninci satır ile a.nıncı satır yer değiştirmektedir. Yani onluk sayı sisteminde 11.inci satır ile 10.cu satır yer değiştirir. Daha sonra 3.sütun ile 2.ci sütun yer değiştirir. Bu şekilde 64 defa yer değiştirme işlemi yapılır. Yer değiştirme işlemi tamamlandığında Şekil 1.2’ deki S-Kutusu oluşur.
<br/>
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/image-3.png)
<br/>
Şekil 1.2
<br/>
<br/>
# Dinamik S-Kutusu İle Görüntü Şifreleme ve Deşifreleme
Renkli görüntüler, Red, Green ve Blue olmak üzere 3 temel renkten meydana gelir. RGB (Red, Green, Blue), her bir temel renk 0-255 arası sayısal değer almaktadır. Bu üç temel rengin karıştırılması ile diğer tüm renkler oluşur. Renkli bir görüntü, piksellerden oluşur ve her piksel RGB’ den oluşur. Yani her bir pikselde 24 bit bulunur. İlk 8 bit R’yi, diğer 8 Bit G’yi ve son 8 bit ise B’yi temsil eder. Şifreleme işlemine başlamadan önce görüntüde bulunan tüm pikseller 16’lık sayı sistemine dönüştürülür.
<br/>
<br/>
Her pikselde bulunan 3 temel renk, sırası ile üretilen S kutusundaki değerler ile değiştirilir. Örneğin, görüntüdeki ilk piksel değeri (60, 168, 219) olsun. Bu değerler sırası ile, S-Kutusundaki değerler ile değiştirilir. 6.satır ve 0.sütundaki değer ile 60 değeri yer değiştir. Değiştirme işlemi yapılmadan önce karmaşıklığı artırmak için rastgele bir konum ile XOR işlemi yapılır. Rastgele konumu üretmek için, PRNG kullanılır. Şekil 1.3’ te S-Kutusu kullanılarak görüntü şifreleme akış diyagramı gösterilmektedir.
<br/>
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/image-6.png)
<br/>
Şekil 1.3
<br/>
<br/>
Şekil 1.3’ teki akış diyagramında, N değer görüntünün genişliği ve M değeri görüntünün yüksekliğini belirtir. İç içe iki döngü ile resimdeki tüm piksellerdeki red, green ve blue değerleri elde edilir. Bu değerler S-Kutusundaki değerler ile değiştirilir. Değiştirilme yapılmadan önce rastgele üretilen değer ile XOR işlemine tabi tutulur. Bu şekilde tüm piksellerin değeri değişmiş olur. Şifrelenen görüntüyü eski haline getirmek için, dinamik olarak oluşturulan S-Kutusundan, Ters S-Kutusu oluşturulur. Ters S-Kutusu kullanılarak deşifreleme işlemi yapılır.
# Örnek
Şifrelenmemiş Görüntü
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/enc.png)
<br/>
<br/>
Şifrelenmiş Görüntü
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/dec.png)
<br/>
Parola: 123456

# Histogram Analizi
-Bir görüntüde yer alan piksellerin yoğunluklarının dağılımını göstermek için histogramlar kullanılır.
<br/>
-Bir saldırgan, şifrelenmiş bir görüntüyü kırmak için, histogramları kullanarak frekans analizi yapar.
<br/>
-Histogramlar kullanılarak yapılan saldırı, istatistiksel saldırı olarak isimlendirilmektedir.
<br/>
-Bu tarz bir saldırının yapılmasını önlemek için, orijinal görüntünün histogramı, şifreli görüntünün histogramında farklı olmalıdır. 
<br/>
-Şifreli görüntünün histogramı, eşit bir dağılım gösteriyorsa, şifreleme işlemi güçlüdür. 

RED
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/red.PNG)
<br/>
<br/>

GREEN
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/green.PNG)
<br/>
<br/>

GREEN
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/blue.PNG)
<br/>
<br/>

# Yapısal Benzerlik İndeksi (Structural Similarity – SSIM)
Yapısal benzerlik indeksi, iki görüntü arasındaki benzerliği ve kalite farkını hesaplamak için kullanılan bir yöntemdir.
<br/>
Yapısal benzerlik sonucu, 1 değerine eşit veya yakın olması, iki görüntünün birbirilerine benzer olduklarına, 0 değerine eşit veya yakın olması ise birbirilerine benzemediklerini belirtir.
<br/>
![alt text](https://github.com/hsndmr/sbox_image_encryption/blob/master/images/ssim.png)

# Kaynaklar
1. Çimen, C., Akleylek, S. ve Akyıldız, E. , "Şifrelerin Matematiği Kriptografi", ODTÜ Yayıncılık, Ankara (2007)
2. Güvenoğlu, E., “Resim Şifreleme Amacıyla Dinamik S Kutusu Tasarımı İçin Bir Yöntem”, El-Cezerî Fen ve Mühendislik Dergisi 2016, 3(2); 179-191.
