export const ModalReportAfterError = {
  error_cause: {
    connect_socket: 'Kết nối không ổn định',
    sync_result_to_shopify: 'Quá trình đồng bộ với shopify lỗi',
    preview_result_in_shopify: 'Quá trình đồng bộ với shopify lỗi',
    migrate_theme: 'Quá trình đồng bộ với shopify lỗi',
    initialization_session_builder: 'Có gì đó sai sai',
    save_result: 'Quá trình lưu gặp lỗi',
    save_page_setting_in_dashboard: 'Quá trình lưu gặp lỗi',
    save_theme_setting_in_dashboard: 'Quá trình lưu gặp lỗi',
    delete_page: 'Quá trình xoá page gặp lỗi',
    update_status_page: 'Quá trình đồng bộ với shopify gặp lỗi',
  },
  error_description: {
    socket_event_id: 'Kết nối không ổn định',
  },
  title: 'Báo lỗi',
  description: "Phản hồi sẽ được gửi đến 'Veda'",
  comments: 'Lời nhắn',
  severity: {
    title: 'Độ nghiệm trọng',
    options: {
      low: 'Thấp',
      normal: 'Bình thường',
      high: 'Cao',
      urgent: 'Khẩn cấp',
    },
  },
  app_status: 'Trạng thái của hệ thống',
  app_message: 'Thông báo từ hệ thống',
  send: 'Gửi đi',
};
