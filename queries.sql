-- Veritabanı Sorguları

-- Posta kodu 1010 olan tüm müşterileri bulun

SELECT *
FROM [Customers]
WHERE PostalCode IN ('1010');

-- id'si 11 olan tedarikçinin telefon numarasını bulun

SELECT SupplierID, SupplierName, Phone 
FROM [Suppliers]
WHERE SupplierID = 11;

-- Verilen ilk 10 siparişi, sipariş tarihine göre azalan şekilde listeleyin

SELECT OrderID, OrderDate
FROM [Orders]
ORDER BY OrderDate DESC
Limit 10;

-- Londra, Madrid veya Brezilya'da yaşayan tüm müşterileri bulun

SELECT CustomerName, City, Country
FROM [Customers]
WHERE (City = 'London' OR City = 'Madrid' OR Country = 'Brazil');

-- "The Shire" için bir müşteri kaydı ekleyin, ilgili kişi adı "Bilbo Baggins", adres - "Bag End" içinde "1 Hobbit-Hole", posta kodu "111" ve ülke "Middle Earth"

INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES('The Shire', 'Bilbo Baggins', 'BagEnd', '1 Hobbit-Hole', '111', 'Orta Dünya');

-- Posta kodu "11122" olarak değişecek şekilde Bilbo Baggins kaydını güncelleyin

UPDATE [Customers]
SET PostalCode='11122'
WHERE ContactName='Bilbo Baggins';

-- (Zorlayıcı Görev) Müşteriler tablosunda kaç farklı şehrin saklandığını keşfetmek için bir sorgu bulun. Tekrarlar çift sayılmamalıdır

SELECT COUNT (DISTINCT City) 
FROM [Customers];

-- (Zorlayıcı Görev) 20 karakterden uzun adları olan tüm tedarikçileri bulun. Adın uzunluğunu almak için "length(SupplierName)" kullanabilirsiniz.

SELECT * FROM [Suppliers] 
WHERE LENGTH(SupplierName) > 20