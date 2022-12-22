# Mô tả use case sync shopify khi ở chế độ build page
- Tiền điều kiện: Dữ liệu của builder đã được lưu vào DB
- Các bước thực hiện:
  1. Sync translations
  2. Sync các addon bị xoá bởi user trong phiên làm việc
  3. Sync atomic css và theme settings
  4. Sync addon
  5. Sync page


# Mô tả use case sync shopify khi ở chế độ build theme
- Tiền điều kiện: Dữ liệu của builder đã được lưu vào DB
- Các bước thực hiện:
  1. Sync translations
  2. Sync các addon bị xoá bởi user trong phiên làm việc
  3. Sync atomic css và theme settings
  4. Sync addon
  5. Sync header footer
  6. Sync các page thuộc theme 


# FAQs

1. Tại sao không sync đồng thời (chạy song song các api sync)
  - Tăng tính stable của app
    - Vấn đề rate limit của shopify. BE cũng có thể kiểm soát rate limit nhưng nếu BE gặp lỗi thì sao?
      1. FE thực hiện retry -> Bắn lại từ đầu -> Ngốn băng thông và tài nguyên server
      2. FE lấy những cái lỗi và bắn lại -> Khắc phục được vấn đề "1" nhưng code sẽ khá khó khăn -> "COST" cao
    - Dễ dàng kiểm soát và giảm rủi ro lỗi chết trắng shop do code js, liquid, css, ...
    - Một lỗi được mô tả tại FAQs-4

2. Tại sao "Sync translations" được thực hiện tại bước 1
  - Khi sync translation lỗi và sync page thành công -> Những đoạn liquid sử dụng filter translation ("t") sẽ hiện message "translation missing ..." -> LỖI CỰC KÌ NGHIÊM TRỌNG

3. Tại sao "Sync các addon bị xoá bởi user trong phiên làm việc" lại thực hiện tại bước 2
  - Tại thời điểm viết file này ngữ cảnh đang như sau:
    - Khi xoá addon -> commandAddonId sẽ được push vào "deletedAddonIds" (xem tại "Result.ts")
    - Người dùng undo để restore addon đó lại -> "deletedAddonIds" lúc này không được update -> SAI
  
  - -> Như 1 cách vá lỗi tạm thời -> Xoá addon -> Thêm lại addon bị xoá

4. Tại sao "Sync atomic css và theme settings" lại thực hiện tại bước 3
  - Xét 2 giả thiết như sau
    1. Chạy song song api sync "page" và "theme"
      - Ưu điểm: Nhanh hơn (tính từ thời điểm click "Save" đến khi "Hoàn thành nghiệp vụ SYNC SHOPIFY" với trạng thái "thành công")
      - Nhược điểm:
        - Sẽ gặp lỗi trong trường hợp "page" được "sync" thành công nhưng "global setting của theme" được "sync" lỗi -> Mô tả 1 trường hợp như sau: Trong "page" có sử dụng js, css, ... trong "global settings của theme" => Kết quả không mong muốn. Một trường hợp cực kì nguy hiểm là "lazyload trong global setting của theme" vì khi đó ảnh của page sẽ "TRẮNG TINH" (1)
        - Sẽ gặp lỗi trong trường hợp "page" được "sync" lỗi nhưng "global setting của theme" được "sync" thành công -> Mô tả 1 trường hợp như sau: Người dùng thay đổi js, css, ... ở "global settings của theme" và BẮT BUỘC phải có sự thay đổi jss, css, ... của "page" để có thể chạy được => Kết quả không mong muốn  (2)
        - "handleWaitForSocketEventFulfill" và "handleSocketEventsFulfill" tại "useSocket.ts" sẽ dài hơn (vì "cờ" trạng thái loading của quá trình sync được coi là hoàn thành khi và chỉ khi sync "page" và "theme" hoàn thành) (3)
        - Tỉ lệ dính rate limit cao hơn (4)
    
    2. Chạy sync "theme" trước và nếu "thành công" sẽ chạy sync các "page"
      - Ưu điểm:
        - Rate limit dễ kiểm soát hơn (nếu quá trình "sync theme" bị rate limit sẽ không phải bắn lên các api "sync page") -> Giải quyết vấn đề (4) của "Cách 1"
        - "handleWaitForSocketEventFulfill" và "handleSocketEventsFulfill" tại "useSocket.ts" sẽ đơn giản hơn -> Giải quyết vấn đề (3) của "Cách 1"
        - Giải quyết lỗi (1) của "Cách 1"
      
      - Nhược điểm:
        - Chậm hơn (tính từ thời điểm click "Save" đến khi "Hoàn thành nghiệp vụ SYNC SHOPIFY" với trạng thái "thành công")
        - Lỗi (2) trong "Cách 1" vẫn tồn tại
  - -> Chọn "Cách 2" vì đơn giản và ít rủi ro hơn "Cách 1"

5. Addon chỉ nên truyền những biến của shopify chi tiết xem tại "syncPage.ts"
 