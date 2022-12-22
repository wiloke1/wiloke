import { createSelector } from 'reselect';
import { ThemeShopify } from 'services/ThemeService/types';
import { ThemeGeneral, ClientTheme } from 'types/Theme';
import { Consts } from 'utils/constants/constants';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  activeThemeVeda,
  changeThemeShopifyActivate,
  deleteClientTheme,
  getClientThemes,
  getThemesShopify,
  getThemeVedaActive,
  loadMoreClientThemes,
  migrateThemeShopify,
} from './actions';

type ExtraActions = ActionTypes<
  | typeof getThemeVedaActive
  | typeof getClientThemes
  | typeof deleteClientTheme
  | typeof loadMoreClientThemes
  | typeof migrateThemeShopify
  | typeof getThemesShopify
  | typeof changeThemeShopifyActivate
  | typeof activeThemeVeda
>;

type Actions =
  | {
      type: 'setModalChangeThemeShopifyActivate';
      payload: { themeId: string } | undefined;
    }
  | {
      type: 'setThemeActive';
      payload: ThemeGeneral;
    }
  | {
      type: 'setVisibleModalMigration';
      payload: boolean;
    };

interface ThemeDashboardState {
  getThemeActiveStatus: Status;
  getClientThemesStatus: Status;
  loadMoreClientThemesStatus: Status;
  deleteClientThemeStatus: Record<string, Status>;

  themeActivate: ThemeGeneral;
  themes: ClientTheme[];
  hasNextPage: boolean;

  migrateThemeShopifyStatus: Status;
  getThemesShopifyStatus: Status;
  shopifyThemes: ThemeShopify[];

  changeThemeShopifyActivateStatus: Status;
  modalChangeThemeShopifyActivate: { themeId: string } | undefined;
  activeThemeVedaStatus: Record<string, Status>;
  visibleModalMigration: boolean;
}

export const sliceThemeDashboard = createSlice<ThemeDashboardState, Actions, ExtraActions>({
  initialState: {
    getThemeActiveStatus: 'idle',
    themeActivate: {
      commandId: '',
      label: '',
      userId: 1,
      featuredImage: '',
      pageCommandIds: [] as ThemeGeneral['pageCommandIds'],
      themeSettings: {
        generalSettings: {
          preloaderEnable: false,
          preloaderVariant: 0,
          preloaderBackgroundColor: '#F57070',
          preloaderColor: '#fff',
          preloaderLogo: '',
          favicon: '',
          label: Consts.BlankCommandId,
        },
        cssVariables: {
          colors: [
            {
              id: 'f704096b-6a44-49c5-b7a9-fa7fb22c46c0',
              name: '--color-primary',
              light: '#F57070',
              dark: '#F57070',
            },
            {
              id: 'eb2e61df-0a92-4fbf-b6cc-5f3a2935649e',
              name: '--color-secondary',
              light: '#3540df',
              dark: '#3540df',
            },
            {
              id: 'd2b6a782-ccc5-41df-8c4f-1ef4e13e4bc7',
              name: '--color-tertiary',
              light: '#2AB885',
              dark: '#2AB885',
            },
            {
              id: '533a9efb-3612-433d-ba56-f294ea76ecb0',
              name: '--color-quaternary',
              light: '#FBC473',
              dark: '#FBC473',
            },
            {
              id: '803f6f1e-576c-4cb2-b277-b88c0ff6cf4d',
              name: '--color-dark',
              light: '#0f0f36',
              dark: '#ffffff',
            },
            {
              id: '6847b250-8adf-46e6-89e8-5abbb9196914',
              name: '--color-gray9',
              light: '#17174F',
              dark: '#F8F8FC',
            },
            {
              id: '097d3c54-af49-466f-9d38-870d0e058818',
              name: '--color-gray8',
              light: '#26256C',
              dark: '#f2f2f7',
            },
            {
              id: '8139ae98-79a3-4a7e-9281-f040b2cfc276',
              name: '--color-gray7',
              light: '#494880',
              dark: '#DEDEE9',
            },
            {
              id: '3f2afa59-f47f-4255-a63e-5467cda5e5a2',
              name: '--color-gray6',
              light: '#6D6D9C',
              dark: '#D2D2E2',
            },
            {
              id: '324d461c-7fd2-44f8-a2ae-01f2046e193a',
              name: '--color-gray5',
              light: '#9E9ECC',
              dark: '#9E9ECC',
            },
            {
              id: '0def0648-29aa-4b9a-8bc2-cc1c3b718357',
              name: '--color-gray4',
              light: '#D2D2E2',
              dark: '#6D6D9C',
            },
            {
              id: '709940f3-efe1-4168-8d7b-bfa376aea625',
              name: '--color-gray3',
              light: '#DEDEE9',
              dark: '#494880',
            },
            {
              id: '4d345a73-7b06-46c6-9fb1-9e4c08ed1018',
              name: '--color-gray2',
              light: '#f2f2f7',
              dark: '#26256C',
            },
            {
              id: 'c7ad6af1-002a-4a5f-8877-c892b57d0279',
              name: '--color-gray1',
              light: '#F8F8FC',
              dark: '#17174F',
            },
            {
              id: '396a29c1-6c5e-45f7-983c-b1041b6c5ced',
              name: '--color-light',
              light: '#ffffff',
              dark: '#17174F',
            },
          ],
          fonts: [
            {
              id: '80e8c8df-a7c7-4a25-b620-f6e59c6b5e17',
              name: '--font-primary',
              value: 'Roboto',
            },
            {
              id: '9f2f3a0a-aac1-4194-b369-a89307c55176',
              name: '--font-secondary',
              value: 'Poppins',
            },
            {
              id: '94340790-b208-4fc1-9983-e278ada7154d',
              name: '--font-tertiary',
              value: 'Playfair Display',
            },
            {
              id: '170f5bed-e0cc-4d3a-a497-6ff8f6ff8bc0',
              name: '--font-quaternary',
              value: 'Roboto Mono',
            },
          ],
        },
        layoutSettings: {
          containerWidth: 1300,
          containerGap: 20,
          columnGapX: 20,
          columnGapY: 20,
        },
        globalTranslations: {
          fr: '',
          vi:
            '{"general":{"password_page":{"login_form_heading":"Vào cửa hàng bằng mật khẩu:","login_password_button":"Vào bằng mật khẩu","login_form_password_label":"Mật khẩu","login_form_password_placeholder":"Mật khẩu của bạn","login_form_error":"Sai mật khẩu!","login_form_submit":"Vào","modal":"Hộp tương tác mật khẩu","admin_link_html":"Bạn có phải chủ cửa hàng không? <a href=\\"/admin\\" class=\\"link underlined-link\\">Đăng nhập tại đây</a>","powered_by_shopify_html":"Cửa hàng này sẽ do {{ shopify }} cung cấp"},"social":{"alt_text":{"share_on_facebook":"Chia sẻ trên Facebook","share_on_twitter":"Tweet trên Twitter","share_on_pinterest":"Ghim trên Pinterest"},"links":{"twitter":"Twitter","facebook":"Facebook","pinterest":"Pinterest","instagram":"Instagram","tumblr":"Tumblr","snapchat":"Snapchat","youtube":"YouTube","vimeo":"Vimeo","tiktok":"TikTok"}},"continue_shopping":"Tiếp tục mua sắm","start_shopping":"Bắt đầu mua sắm","nothing_found":"Nothing found","pagination":{"label":"Phân trang","page":"Trang {{ number }}","next":"Trang sau","previous":"Trang trước"},"search":{"search":"Tìm kiếm"},"cart":{"view":"Xem giỏ hàng của tôi ({{ count }})","item_added":"Mặt hàng đã thêm vào giỏ hàng"},"share":{"copy_to_clipboard":"Sao chép liên kết","share":"Chia sẻ","share_url":"Liên kết","success_message":"Đã sao chép liên kết vào bảng nhớ tạm","close":"Đóng cửa sổ chia sẻ"}},"newsletter":{"title":"Newsletter","label":"Email","description":"At vero eos et accusamus et iusto odio dignis ducimus qui blandi praesen volupta deleniti at corrupti quos dolores et quas molestias excep sint.","success":"Cảm ơn bạn đã đăng ký","button_label":"Đăng ký","button_get":"Get","button_join":"Join"},"accessibility":{"skip_to_text":"Chuyển đến nội dung","close":"Đóng","unit_price_separator":"trên","vendor":"Nhà cung cấp:","error":"Lỗi","refresh_page":"Khi bạn chọn một mục, toàn bộ trang sẽ được làm mới.","link_messages":{"new_window":"Mở trong cửa sổ mới.","external":"Mở trang web bên ngoài."},"next_slide":"Trượt sang phải","previous_slide":"Trượt sang trái","loading":"Đang tải...","of":"trên","skip_to_product_info":"Chuyển đến thông tin sản phẩm","total_reviews":"tổng số lượt đánh giá","star_reviews_info":"{{ rating_value }}/{{ rating_max }} sao"},"blogs":{"article":{"blog":"Blog","read_more_title":"Đọc thêm: {{ title }}","read_more":"Đọc thêm","comments":{"one":"{{ count }} bình luận","other":"{{ count }} bình luận"},"moderated":"Xin lưu ý, bình luận cần được phê duyệt trước khi được đăng.","comment_form_title":"Để lại bình luận","name":"Tên","email":"Email","message":"Bình luận","post":"Gửi bình luận","back_to_blog":"Quay lại blog","share":"Chia sẻ bài viết này","success":"Bạn đã gửi bình luận thành công! Xin cảm ơn!","success_moderated":"Bạn đã gửi bình luận thành công. Chúng tôi sẽ đăng bình luận sau chốc lát, khi blog của chúng tôi được kiểm duyệt.","popular_posts":"Popular posts"}},"onboarding":{"product_title":"Tiêu đề sản phẩm mẫu","collection_title":"Tên bộ sưu tập của bạn"},"products":{"product":{"add_to_cart":"Thêm vào giỏ hàng","add_to_cart_success":"Thêm vào giỏ hàng thanh công","added_to_cart":"Đã thêm vào giỏ hàng","remove_from_cart":"Remove from cart","add_to_wishlist":"Add to wishlist","add_to_compare":"Add to compare","quick_view":"Quick view","remove_from_wishlist":"Remove from wishlist","remove_from_compare":"Remove from compare","description":"Mô tả","on_sale":"Giảm giá","product_variants":"Mẫu mã sản phẩm","availabitity":"Availability","product_type":"Product type","instock":"In stock","outofstock":"Out of stock","ask_an_expert":"Ask an expert","buy_it_now":"Buy it now","color":"Color","size":"Size","confirm_text":"I Agree With The Tearms & Conditions","quantity_viewer":"{{count}} customers are viewing this product","quantity_items":"{{count}} Items","quantity":{"label":"Số lượng","input_label":"Số lượng của {{ product }}","increase":"Tăng số lượng của {{ product }}","decrease":"Giảm số lượng của {{ product }}"},"price":{"title":"Price","from_price_html":"Từ {{ price }}","regular_price":"Giá thông thường","sale_price":"Giá bán","unit_price":"Đơn giá","from":"From","to":"To"},"share":"Chia sẻ sản phẩm này","sold_out":"Đã bán hết","unavailable":"Không có sẵn","vendor":"Nhà cung cấp","video_exit_message":"{{ title }} mở video toàn màn hình ở cùng một cửa sổ.","xr_button":"Xem tại không gian của bạn","xr_button_label":"Xem tại không gian của bạn, tải mặt hàng trong cửa sổ thực tế tăng cường","pickup_availability":{"view_store_info":"Xem thông tin cửa hàng","check_other_stores":"Kiểm tra tình trạng còn hàng tại các cửa hàng khác","pick_up_available":"Có thể nhận hàng tại cửa hàng","pick_up_available_at_html":"Có thể nhận hàng tại <span class=\\"color-foreground\\">{{ location_name }}</span>","pick_up_unavailable_at_html":"Hiện chưa thể nhận hàng tại <span class=\\"color-foreground\\">{{ location_name }}</span>","unavailable":"Không thể tải khả năng nhận hàng tại cửa hàng","refresh":"Làm mới"},"media":{"open_featured_media":"Mở phương tiện nổi bật trong dạng xem bộ sưu tập","open_media":"Mở {{ index }} phương tiện trong dạng xem bộ sưu tập","play_model":"Mở Trình xem 3D","play_video":"Phát video"},"view_full_details":"Xem toàn bộ chi tiết"},"compare":{"title":"So sánh","rating_text":"Đánh giá"},"modal":{"label":"Thư viện phương tiện"}},"templates":{"404":{"title":"Không tìm thấy trang","subtext":"404"},"search":{"no_results":"Không tìm thấy kết quả cho \\"{{ terms }}\\". Kiểm tra chính tả hoặc sử dụng một từ hoặc cụm từ khác.","results_with_count":{"one":"Tìm thấy {{ count }} kết quả cho “{{ terms }}”","other":"Tìm thấy {{ count }} kết quả cho “{{ terms }}”"},"title":"Kết quả tìm kiếm","page":"Trang","products":"Sản phẩm","search_for":"Tìm kiếm “{{ terms }}”"},"cart":{"cart":"Giỏ hàng"},"contact":{"form":{"name":"Tên","email":"Email","phone":"Số điện thoại","comment":"Bình luận","send":"Gửi","post_success":"Cảm ơn đã liên hệ với chúng tôi. Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.","error_heading":"Vui lòng điều chỉnh các mục sau:"}}},"sections":{"header":{"announcement":"Thông báo","menu":"Menu","cart_count":{"one":"{{ count }} mặt hàng","other":"{{ count }} mặt hàng"}},"cart":{"title":"Giỏ hàng của bạn","caption":"Các mặt hàng trong giỏ hàng","remove_title":"Xóa {{ title }}","remove":"Remove","color":"Color","subtotal":"Tổng phụ","new_subtotal":"Tổng phụ mới","note":"Hướng dẫn đặc biệt của đơn hàng","checkout":"Thanh toán","empty":"Giỏ hàng của bạn đang trống","cart_error":"Đã xảy ra lỗi khi cập nhật giỏ hàng. Vui lòng thử lại.","cart_quantity_error_html":"Bạn chỉ có thể thêm [số lượng] mặt hàng này vào giỏ hàng.","taxes_and_shipping_policy_at_checkout_html":"Thuế và <a href=\\"{{ link }}\\">phí vận chuyển</a> được tính khi thanh toán","taxes_included_but_shipping_at_checkout":"Đã bao gồm thuế và phí vận chuyển được tính khi thanh toán","taxes_included_and_shipping_policy_html":"Đã bao gồm thuế. <a href=\\"{{ link }}\\">Phí vận chuyển</a> được tính khi thanh toán.","taxes_and_shipping_at_checkout":"Thuế và phí vận chuyển được tính khi thanh toán","headings":{"product":"Sản phẩm","price":"Giá","total":"Tổng","quantity":"Số lượng"},"update":"Cập nhật","login":{"title":"Bạn đã có tài khoản?","paragraph_html":"<a href=\\"{{ link }}\\" class=\\"link underlined-link\\">Đăng nhập</a> để thanh toán nhanh hơn."},"estimate_shipping_rates":"Estimate shipping rates","add_note_for_seller":"Add note for seller","special_instrutions_for_seller":"Special instrutions for seller","calculate_shipping_rates":"Calculate shipping rates","shopping_cart_title":"Shopping cart","limited_checkout_title":"These products are limited, checkout within","buy_to_free_shipping":"Buy {{ price }} more to enjoy FREE Shipping","coupon_code":"Coupon code","apply_coupon":"Apply Coupon","update_cart":"Update Cart","checkout_now_to_free_shipping":"Checkout now to enjoy FREE Shipping"},"footer":{"payment":"Phương thức thanh toán","call_us":"Call us","social_placeholder":"Hãy theo dõi chúng tôi trên truyền thông xã hội!"},"featured_blog":{"view_all":"Xem tất cả","onboarding_title":"Bài viết blog","onboarding_content":"Cho khách hàng xem tóm tắt bài viết blog"},"featured_collection":{"view_all":"Xem tất cả","view_all_label":"Xem toàn bộ sản phẩm trong bộ sưu tập {{ collection_name }}","refine_by":"Refine by","categories":"Categories","color":"Color","size":"Size","brand":"Brand","availability":"Availability","price":"Price","tag":"Tag"},"collection_list":{"view_all":"Xem tất cả"},"collection_template":{"title":"Bộ sưu tập","sort_by_label":"Sắp xếp theo:","sort_button":"Sắp xếp","empty":"Không tìm thấy sản phẩm","apply":"Áp dụng","clear":"Xóa","clear_all":"Xóa tất cả","from":"Từ","filter_and_sort":"Lọc và sắp xếp","filter_by_label":"Bộ lọc:","filter_button":"Lọc","max_price":"Giá cao nhất là {{ price }}","reset":"Đặt lại","to":"Đến","use_fewer_filters_html":"Sử dụng ít bộ lọc hơn hoặc <a class=\\"{{ class }}\\" href=\\"{{ link }}\\">xóa tất cả</a>","product_count":{"one":"{{ product_count }}/{{ count }} sản phẩm","other":"{{ product_count }}/{{ count }} sản phẩm"},"filters_selected":{"one":"Đã chọn {{ count }}","other":"Đã chọn {{ count }}"},"product_count_simple":{"one":"{{ count }} sản phẩm","other":"{{ count }} sản phẩm"}},"video":{"load_video":"Tải video: {{ description }}"}},"localization":{"country_label":"Quốc gia/khu vực","language_label":"Ngôn ngữ","update_language":"Cập nhật ngôn ngữ","update_country":"Cập nhật quốc gia/khu vực"},"customer":{"account":{"title":"Tài khoản","details":"Chi tiết tài khoản","view_addresses":"Xem địa chỉ","return":"Quay lại Chi tiết tài khoản"},"account_fallback":"Tài khoản","activate_account":{"title":"Kích hoạt tài khoản","subtext":"Tạo mật khẩu để kích hoạt tài khoản.","password":"Mật khẩu","password_confirm":"Xác nhận mật khẩu","submit":"Kích hoạt tài khoản","cancel":"Từ chối lời mời"},"addresses":{"title":"Địa chỉ","default":"Mặc định","add_new":"Thêm địa chỉ mới","edit_address":"Sửa địa chỉ","first_name":"Tên","last_name":"Họ","company":"Công ty","address1":"Địa chỉ 1","address2":"Địa chỉ 2","city":"Thành phố","country":"Quốc gia/khu vực","province":"Tỉnh","zip":"Mã bưu chính/mã ZIP","phone":"Điện thoại","set_default":"Đặt làm địa chỉ mặc định","add":"Thêm địa chỉ","update":"Cập nhật địa chỉ","change_address":"Change address","cancel":"Hủy","edit":"Chỉnh sửa","delete":"Xóa","delete_confirm":"Bạn có chắc chắn muốn xóa địa chỉ này không?"},"log_in":"Đăng nhập","log_out":"Đăng xuất","sign_up":"Sign up","login_page":{"cancel":"Hủy","create_account":"Tạo tài khoản","email":"Email","forgot_password":"Quên mật khẩu?","guest_continue":"Tiếp tục","guest_title":"Tiếp tục với tư cách khách","password":"Mật khẩu","title":"Đăng nhập","subtitle":"Lorem ipsum dolor sit amet, consectetur adipiscing","sign_in":"Đăng nhập","submit":"Gửi"},"orders":{"title":"Lịch sử đặt hàng","order_number":"Đơn hàng","order_number_link":"Đơn hàng số {{ number }}","date":"Ngày","payment_status":"Trạng thái thanh toán","fulfillment_status":"Trạng thái thực hiện","total":"Tổng","none":"Bạn chưa đặt đơn hàng nào."},"recover_password":{"title":"Đặt lại mật khẩu","subtext":"Chúng tôi sẽ gửi email cho bạn để đặt lại mật khẩu","success":"Chúng tôi đã gửi cho bạn email chứa liên kết cập nhật mật khẩu."},"register":{"title":"Tạo tài khoản","description":"Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.","first_name":"Tên","last_name":"Họ","email":"Email","password":"Mật khẩu","submit":"Tạo"},"reset_password":{"title":"Đặt lại mật khẩu tài khoản","subtext":"Nhập mật khẩu mới cho {{ email }}","password":"Mật khẩu","password_confirm":"Xác nhận mật khẩu","submit":"Đặt lại mật khẩu"},"order":{"title":"Đơn hàng {{ name }}","date_html":"Đặt vào {{ date }}","cancelled_html":"Đơn hàng đã bị hủy vào {{ date }}","cancelled_reason":"Lý do: {{ reason }}","billing_address":"Địa chỉ thanh toán","payment_status":"Trạng thái thanh toán","shipping_address":"Địa chỉ giao hàng","fulfillment_status":"Trạng thái thực hiện","discount":"Giảm giá","shipping":"Vận chuyển","tax":"Thuế","product":"Sản phẩm","sku":"SKU","price":"Giá","quantity":"Số lượng","total":"Tổng","fulfilled_at_html":"Đã thực hiện {{ date }}","track_shipment":"Theo dõi lô hàng","tracking_url":"Liên kết theo dõi","tracking_company":"Hãng vận chuyển","tracking_number":"Số theo dõi","subtotal":"Tổng phụ"}},"gift_cards":{"issued":{"title":"Đây là thẻ quà tặng {{ value }} của bạn cho {{ shop }}!","subtext":"Thẻ quà tặng của bạn","gift_card_code":"Mã thẻ quà tặng","shop_link":"Tiếp tục mua sắm","remaining_html":"Còn lại {{ balance }}","add_to_apple_wallet":"Thêm vào Apple Wallet","qr_image_alt":"Mã QR — quét để đổi thẻ quà tặng","copy_code":"Sao chép mã","expired":"Đã hết hạn","copy_code_success":"Đã sao chép mã thành công","print_gift_card":"In"}},"pagefly":{"products":{"product":{"regular_price":"Regular price","sold_out":"Sold out","unavailable":"Unavailable","on_sale":"Sale","quantity":"Quantity","add_to_cart":"Add to cart","back_to_collection":"Back to {{ title }}","view_details":"xem chi tiết"}},"article":{"tags":"Tags","all_topics":"All topics","by_author":"by {{ author }}","posted_in":"Posted in","read_more":"Read more","back_to_blog":"Back to {{ title }}"},"comments":{"title":"Leave a comment","name":"Name","email":"Email","message":"Message","post":"Post comment","moderated":"Please note, comments must be approved before they are published","success_moderated":"Your comment was posted successfully. We will publish it in a little while, as our blog is moderated.","success":"Your comment was posted successfully! Thank you!","comments_with_count":{"one":"{{ count }} comment","other":"{{ count }} comments"}},"password_page":{"login_form_message":"Enter store using password:","login_form_password_label":"Password","login_form_password_placeholder":"Your password","login_form_submit":"Enter","signup_form_email_label":"Email","signup_form_success":"We will send you an email right before we open!","password_link":"Enter using password"}}}',
          en:
            '{"general":{"password_page":{"login_form_heading":"Enter {{ first_name }} store {{ last_name }} using password:","login_password_button":"Enter using password","login_form_password_label":"Password","login_form_password_placeholder":"Your password","login_form_error":"Wrong password!","login_form_submit":"Enter","modal":"Password modal","admin_link_html":"Are you the store owner? <a href=\\"/admin\\" class=\\"link underlined-link\\">Log in here</a>","powered_by_shopify_html":"This shop will be powered by {{ shopify }}"},"social":{"alt_text":{"share_on_facebook":"Share on Facebook","share_on_twitter":"Tweet on Twitter","share_on_pinterest":"Pin on Pinterest"},"links":{"twitter":"Twitter","facebook":"Facebook","pinterest":"Pinterest","instagram":"Instagram","tumblr":"Tumblr","snapchat":"Snapchat","youtube":"YouTube","vimeo":"Vimeo","tiktok":"TikTok"}},"continue_shopping":"Continue shopping","start_shopping":"Start shopping","nothing_found":"Nothing found","pagination":{"label":"Pagination","page":"Page {{ number }}","next":"Next page","previous":"Previous page"},"search":{"search":"Search"},"cart":{"view":"View my cart ({{ count }})","item_added":"Item added to your cart"},"share":{"close":"Close share","copy_to_clipboard":"Copy link","share_url":"Link","success_message":"Link copied to clipboard"}},"newsletter":{"title":"Newsletter","label":"Email","description":"At vero eos et accusamus et iusto odio dignis ducimus qui blandi praesen volupta deleniti at corrupti quos dolores et quas molestias excep sint.","success":"Thanks for subscribing","button_label":"Subscribe","button_get":"Get","button_join":"Join"},"accessibility":{"skip_to_text":"Skip to content","skip_to_product_info":"Skip to product information","close":"Close","unit_price_separator":"per","vendor":"Vendor:","error":"Error","refresh_page":"Choosing a selection results in a full page refresh.","link_messages":{"new_window":"Opens in a new window.","external":"Opens external website."},"of":"of","next_slide":"Slide right","previous_slide":"Slide left","loading":"Loading...","total_reviews":"total reviews","star_reviews_info":"{{ rating_value }} out of {{ rating_max }} stars"},"blogs":{"article":{"blog":"Blog","read_more_title":"Read more: {{ title }}","comments":{"one":"{{ count }} comment","other":"{{ count }} comments"},"moderated":"Please note, comments need to be approved before they are published.","comment_form_title":"Leave a comment","name":"Name","email":"Email","message":"Comment","post":"Post comment","back_to_blog":"Back to blog","share":"Share this article","success":"Your comment was posted successfully! Thank you!","success_moderated":"Your comment was posted successfully. We will publish it in a little while, as our blog is moderated.","popular_posts":"Popular posts"}},"onboarding":{"product_title":"Example product title","collection_title":"Your collection\'s name"},"products":{"product":{"add_to_cart":"Add to cart","add_to_cart_success":"Added to cart successful","added_to_cart":"Added to cart","remove_from_cart":"Remove from cart","add_to_wishlist":"Add to wishlist","add_to_compare":"Add to compare","quick_view":"Quick view","remove_from_wishlist":"Remove from wishlist","remove_from_compare":"Remove from compare","description":"Description","on_sale":"Sale","product_variants":"Product variants","availabitity":"Availability","product_type":"Product type","instock":"In stock","outofstock":"Out of stock","ask_an_expert":"Ask an expert","buy_it_now":"Buy it now","color":"Color","size":"Size","confirm_text":"I Agree With The Tearms & Conditions","quantity_viewer":"{{count}} customers are viewing this product","quantity_items":"{{count}} Items","media":{"open_featured_media":"Open featured media in gallery view","open_media":"Open media {{ index }} in gallery view","play_model":"Play 3D Viewer","play_video":"Play video"},"quantity":{"label":"Quantity","input_label":"Quantity for {{ product }}","increase":"Increase quantity for {{ product }}","decrease":"Decrease quantity for {{ product }}"},"pickup_availability":{"view_store_info":"View store information","check_other_stores":"Check availability at other stores","pick_up_available":"Pickup available","pick_up_available_at_html":"Pickup available at <span class=\\"color-foreground\\">{{ location_name }}</span>","pick_up_unavailable_at_html":"Pickup currently unavailable at <span class=\\"color-foreground\\">{{ location_name }}</span>","unavailable":"Couldn\'t load pickup availability","refresh":"Refresh"},"price":{"title":"Price","from_price_html":"From {{ price }}","regular_price":"Regular price","sale_price":"Sale price","unit_price":"Unit price","from":"From","to":"To"},"share":"Share this product","sold_out":"Sold out","unavailable":"Unavailable","vendor":"Vendor","video_exit_message":"{{ title }} opens full screen video in same window.","view_full_details":"View full details","xr_button":"View in your space","xr_button_label":"View in your space, loads item in augmented reality window"},"compare":{"title":"Compare","rating_text":"Rating"},"modal":{"label":"Media gallery"}},"templates":{"404":{"title":"Page not found","subtext":"404"},"search":{"no_results":"No results found for “{{ terms }}”. Check the spelling or use a different word or phrase.","page":"Page","products":"Products","results_with_count":{"one":"{{ count }} result found for “{{ terms }}”","other":"{{ count }} results found for “{{ terms }}”"},"title":"Search results","search_for":"Search for “{{ terms }}”"},"cart":{"cart":"Cart"},"contact":{"form":{"name":"Name","email":"Email","phone":"Phone number","comment":"Comment","send":"Send","post_success":"Thanks for contacting us. We\'ll get back to you as soon as possible.","error_heading":"Please adjust the following:"}}},"sections":{"header":{"announcement":"Announcement","menu":"Menu","cart_count":{"one":"{{ count }} item","other":"{{ count }} items"}},"cart":{"title":"Your cart","caption":"Cart items","remove_title":"Remove {{ title }}","remove":"Remove","color":"Color","subtotal":"Subtotal","new_subtotal":"New subtotal","note":"Order special instructions","checkout":"Check out","empty":"Your cart is empty","cart_error":"There was an error while updating your cart. Please try again.","cart_quantity_error_html":"You can only add [quantity] of this item to your cart.","taxes_and_shipping_policy_at_checkout_html":"Taxes and <a href=\\"{{ link }}\\">shipping</a> calculated at checkout","taxes_included_but_shipping_at_checkout":"Tax included and shipping calculated at checkout","taxes_included_and_shipping_policy_html":"Tax included. <a href=\\"{{ link }}\\">Shipping</a> calculated at checkout.","taxes_and_shipping_at_checkout":"Taxes and shipping calculated at checkout","headings":{"product":"Product","price":"Price","total":"Total","quantity":"Quantity"},"update":"Update","login":{"title":"Have an account?","paragraph_html":"<a href=\\"{{ link }}\\" class=\\"link underlined-link\\">Log in</a> to check out faster."},"estimate_shipping_rates":"Estimate shipping rates","add_note_for_seller":"Add note for seller","special_instrutions_for_seller":"Special instrutions for seller","calculate_shipping_rates":"Calculate shipping rates","shopping_cart_title":"Shopping cart","limited_checkout_title":"These products are limited, checkout within","buy_to_free_shipping":"Buy {{ price }} more to enjoy FREE Shipping","coupon_code":"Coupon code","apply_coupon":"Apply Coupon","update_cart":"Update Cart","checkout_now_to_free_shipping":"Checkout now to enjoy FREE Shipping"},"footer":{"payment":"Payment methods","call_us":"Call us"},"featured_blog":{"view_all":"View all","onboarding_title":"Blog post","onboarding_content":"Give your customers a summary of your blog post"},"featured_collection":{"view_all":"View all","view_all_label":"View all products in the {{ collection_name }} collection","refine_by":"Refine by","categories":"Categories","color":"Color","size":"Size","brand":"Brand","availability":"Availability","price":"Price","tag":"Tag"},"collection_list":{"view_all":"View all"},"collection_template":{"apply":"Apply","clear":"Clear","clear_all":"Clear all","empty":"No products found","from":"From","filter_and_sort":"Filter and sort","filter_by_label":"Filter:","filter_button":"Filter","filters_selected":{"one":"{{ count }} selected","other":"{{ count }} selected"},"max_price":"The highest price is {{ price }}","product_count":{"one":"{{ product_count }} of {{ count }} product","other":"{{ product_count }} of {{ count }} products"},"product_count_simple":{"one":"{{ count }} product","other":"{{ count }} products"},"reset":"Reset","sort_button":"Sort","sort_by_label":"Sort by:","title":"Collection","to":"To","use_fewer_filters_html":"Use fewer filters or <a class=\\"{{ class }}\\" href=\\"{{ link }}\\">clear all</a>"},"video":{"load_video":"Load video: {{ description }}"}},"localization":{"country_label":"Country/region","state_label":"State","language_label":"Language","update_language":"Update language","update_country":"Update country/region"},"customer":{"account":{"title":"Account","details":"Account details","view_addresses":"View addresses","return":"Return to Account details"},"account_fallback":"Account","activate_account":{"title":"Activate account","subtext":"Create your password to activate your account.","password":"Password","password_confirm":"Confirm password","submit":"Activate account","cancel":"Decline invitation"},"addresses":{"title":"Addresses","default":"Default","add_new":"Add a new address","edit_address":"Edit address","first_name":"First name","last_name":"Last name","company":"Company","address1":"Address 1","address2":"Address 2","city":"City","country":"Country/region","province":"Province","zip":"Postal/ZIP code","phone":"Phone","set_default":"Set as default address","add":"Add address","update":"Update address","change_address":"Change address","cancel":"Cancel","edit":"Edit","delete":"Delete","delete_confirm":"Are you sure you wish to delete this address?"},"log_in":"Log in","log_out":"Log out","sign_up":"Sign up","login_page":{"cancel":"Cancel","create_account":"Create account","email":"Email","forgot_password":"Forgot your password?","guest_continue":"Continue","guest_title":"Continue as a guest","password":"Password","title":"Login","subtitle":"Lorem ipsum dolor sit amet, consectetur adipiscing","sign_in":"Sign in","submit":"Submit"},"order":{"title":"Order {{ name }}","date_html":"Placed on {{ date }}","cancelled_html":"Order Cancelled on {{ date }}","cancelled_reason":"Reason: {{ reason }}","billing_address":"Billing Address","payment_status":"Payment Status","shipping_address":"Shipping Address","fulfillment_status":"Fulfillment Status","discount":"Discount","shipping":"Shipping","tax":"Tax","product":"Product","sku":"SKU","price":"Price","quantity":"Quantity","total":"Total","fulfilled_at_html":"Fulfilled {{ date }}","track_shipment":"Track shipment","tracking_url":"Tracking link","tracking_company":"Carrier","tracking_number":"Tracking number","subtotal":"Subtotal"},"orders":{"title":"Order history","order_number":"Order","order_number_link":"Order number {{ number }}","date":"Date","payment_status":"Payment status","fulfillment_status":"Fulfillment status","total":"Total","none":"You haven\'t placed any orders yet."},"recover_password":{"title":"Reset your password","subtext":"We will send you an email to reset your password","success":"We\'ve sent you an email with a link to update your password."},"register":{"title":"Create account","description":"Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.","first_name":"First name","last_name":"Last name","email":"Email","password":"Password","submit":"Create"},"reset_password":{"title":"Reset account password","subtext":"Enter a new password for {{ email }}","password":"Password","password_confirm":"Confirm password","submit":"Reset password"}},"gift_cards":{"issued":{"title":"Here\'s your {{ value }} gift card for {{ shop }}!","subtext":"Your gift card","gift_card_code":"Gift card code","shop_link":"Continue shopping","remaining_html":"Remaining {{ balance }}","add_to_apple_wallet":"Add to Apple Wallet","qr_image_alt":"QR code — scan to redeem gift card","copy_code":"Copy code","expired":"Expired","copy_code_success":"Code copied successfully","print_gift_card":"Print"}},"pagefly":{"products":{"product":{"regular_price":"Regular price","sold_out":"Sold out","unavailable":"Unavailable","on_sale":"Sale","quantity":"Quantity","add_to_cart":"Add to cart","back_to_collection":"Back to {{ title }}","view_details":"View details"}},"article":{"tags":"Tags","all_topics":"All topics","by_author":"by {{ author }}","posted_in":"Posted in","read_more":"Read more","back_to_blog":"Back to {{ title }}"},"comments":{"title":"Leave a comment","name":"Name","email":"Email","message":"Message","post":"Post comment","moderated":"Please note, comments must be approved before they are published","success_moderated":"Your comment was posted successfully. We will publish it in a little while, as our blog is moderated.","success":"Your comment was posted successfully! Thank you!","comments_with_count":{"one":"{{ count }} comment","other":"{{ count }} comments"}},"password_page":{"login_form_message":"Enter store using password:","login_form_password_label":"Password","login_form_password_placeholder":"Your password","login_form_submit":"Enter","signup_form_email_label":"Email","signup_form_success":"We will send you an email right before we open!","password_link":"Enter using password"}}}',
        },
      },
      vendors: [] as ThemeGeneral['vendors'],
      globalJs: '',
      globalScss: '',
      addonCommandIds: [],
      headerSectionCommandIds: [] as ThemeGeneral['headerSectionCommandIds'],
      footerSectionCommandIds: [] as ThemeGeneral['footerSectionCommandIds'],
      createdDateTimestamp: Date.now(),
      modifiedDateTimestamp: Date.now(),
    },
    getClientThemesStatus: 'idle',
    loadMoreClientThemesStatus: 'idle',
    themes: [],
    hasNextPage: false,
    deleteClientThemeStatus: {},

    migrateThemeShopifyStatus: 'idle',
    getThemesShopifyStatus: 'idle',
    shopifyThemes: [],

    changeThemeShopifyActivateStatus: 'idle',
    modalChangeThemeShopifyActivate: undefined,
    activeThemeVedaStatus: {},
    visibleModalMigration: false,
  },
  name: '@Dashboard',
  reducers: [
    handleAction('setModalChangeThemeShopifyActivate', ({ state, action }) => {
      state.modalChangeThemeShopifyActivate = action.payload;
    }),
    handleAction('setThemeActive', ({ state, action }) => {
      state.themeActivate = action.payload;
    }),
    handleAction('setVisibleModalMigration', ({ state, action }) => {
      state.visibleModalMigration = action.payload;
    }),
  ],
  extraReducers: [
    handleAction('@Dashboard/getThemeVedaActive/request', ({ state }) => {
      state.getThemeActiveStatus = 'loading';
    }),
    handleAction('@Dashboard/getThemeVedaActive/success', ({ state, action }) => {
      state.getThemeActiveStatus = 'success';
      state.themeActivate = action.payload;
    }),
    handleAction('@Dashboard/getThemeVedaActive/failure', ({ state }) => {
      state.getThemeActiveStatus = 'failure';
    }),
    handleAction('@Dashboard/getClientThemes/request', ({ state }) => {
      state.getClientThemesStatus = state.themes.length ? 'success' : 'loading';
    }),
    handleAction('@Dashboard/getClientThemes/success', ({ state, action }) => {
      state.getClientThemesStatus = 'success';
      state.themes = action.payload.data;
      state.hasNextPage = action.payload.hasNextPage;
    }),
    handleAction('@Dashboard/getClientThemes/failure', ({ state }) => {
      state.getClientThemesStatus = 'failure';
    }),
    handleAction('@Dashboard/deleteClientTheme/request', ({ state, action }) => {
      state.deleteClientThemeStatus[action.payload.commandId] = 'loading';
    }),
    handleAction('@Dashboard/deleteClientTheme/success', ({ state, action }) => {
      state.deleteClientThemeStatus[action.payload.commandId] = 'success';
      state.themes = state.themes.filter(theme => theme.commandId !== action.payload.commandId);
    }),
    handleAction('@Dashboard/deleteClientTheme/failure', ({ state, action }) => {
      state.deleteClientThemeStatus[action.payload.commandId] = 'failure';
    }),
    handleAction('@Dashboard/loadMoreClientThemes/request', ({ state }) => {
      state.loadMoreClientThemesStatus = 'loading';
    }),
    handleAction('@Dashboard/loadMoreClientThemes/success', ({ state, action }) => {
      state.loadMoreClientThemesStatus = 'success';
      state.themes = state.themes.concat(action.payload.data);
      state.hasNextPage = action.payload.hasNextPage;
    }),
    handleAction('@Dashboard/loadMoreClientThemes/failure', ({ state }) => {
      state.loadMoreClientThemesStatus = 'failure';
    }),
    handleAction('@Dashboard/migrateThemeShopify/request', ({ state }) => {
      return {
        ...state,
        migrateThemeShopifyStatus: 'loading',
      };
    }),
    handleAction('@Dashboard/migrateThemeShopify/success', ({ state }) => {
      return {
        ...state,
        migrateThemeShopifyStatus: 'success',
      };
    }),
    handleAction('@Dashboard/migrateThemeShopify/failure', ({ state }) => {
      return {
        ...state,
        migrateThemeShopifyStatus: 'failure',
      };
    }),
    handleAction('@Dashboard/getThemesShopify/request', ({ state }) => {
      return {
        ...state,
        getThemesShopifyStatus: 'loading',
      };
    }),
    handleAction('@Dashboard/getThemesShopify/success', ({ state, action }) => {
      return {
        ...state,
        getThemesShopifyStatus: 'success',
        shopifyThemes: action.payload,
      };
    }),
    handleAction('@Dashboard/getThemesShopify/failure', ({ state }) => {
      return {
        ...state,
        getThemesShopifyStatus: 'failure',
      };
    }),
    handleAction('@Dashboard/changeThemeShopifyActivate/request', ({ state }) => {
      state.changeThemeShopifyActivateStatus = 'loading';
    }),
    handleAction('@Dashboard/changeThemeShopifyActivate/success', ({ state }) => {
      state.changeThemeShopifyActivateStatus = 'success';
    }),
    handleAction('@Dashboard/changeThemeShopifyActivate/failure', ({ state }) => {
      state.changeThemeShopifyActivateStatus = 'failure';
    }),
    handleAction('@Dashboard/activeThemeVeda/request', ({ state, action }) => {
      state.activeThemeVedaStatus[action.payload.themeId] = 'loading';
    }),
    handleAction('@Dashboard/activeThemeVeda/success', ({ state, action }) => {
      state.activeThemeVedaStatus[action.payload.themeId] = 'success';
    }),
    handleAction('@Dashboard/activeThemeVeda/failure', ({ state, action }) => {
      state.activeThemeVedaStatus[action.payload.themeId] = 'failure';
    }),
  ],
});

export const { setModalChangeThemeShopifyActivate, setThemeActive, setVisibleModalMigration } = sliceThemeDashboard.actions;
export const useSetModalChangeThemeShopifyActivate = createDispatchAction(setModalChangeThemeShopifyActivate);
export const useSetVisibleModalMigration = createDispatchAction(setVisibleModalMigration);

export const themeDashboardSelector = (state: AppState) => state.adminDashboard.themeBuilder.themeDashboard;

export const isThemeDefaultSelector = createSelector(themeDashboardSelector, state => {
  const { getThemeActiveStatus, themeActivate } = state;
  return getThemeActiveStatus === 'success' && themeActivate.pageCommandIds.length === 0;
});
