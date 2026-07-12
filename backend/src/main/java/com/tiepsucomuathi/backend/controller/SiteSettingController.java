package com.tiepsucomuathi.backend.controller;

import com.tiepsucomuathi.backend.entity.SiteSetting;
import com.tiepsucomuathi.backend.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SiteSettingController {

    private final SiteSettingRepository settingRepo;

    @GetMapping
    public ResponseEntity<SiteSetting> getSettings() {
        SiteSetting setting = settingRepo.findAll().stream().findFirst().orElse(null);
        if (setting == null) {
            // Seed a default configuration so that the app doesn't break
            setting = SiteSetting.builder()
                    .heroTitle("Kỷ Yếu Tiếp Sức Mùa Thi 2026")
                    .heroSubtitle("Nơi ghi dấu những bước chân tình nguyện, những nụ cười rạng rỡ và những khoảnh khắc không thể nào quên của tuổi trẻ tiếp sức mùa thi.")
                    .heroBackground("https://lh3.googleusercontent.com/aida-public/AB6AXuAQcEBOCqSddiQ5l8C7DeoiNoPCsvPHNb4cyxDYsh7yRuk3kIQvmvKkyrFFwNnTsU_pQPPIRhjrtBuULL6_AG7CwHhFbgiWYkpIoWHQa__fP-ZV4XMNzV7MWZo1Xw4_gEh3EBGtjnrqa5FkfKACweekayQvcLCuQZfadCd4mf5mN4OzgQ1UPshothxny1H7M-cXV1qmg_4lQu9dprjdc2wHZb7og9ELajhoSmOFKreMQY090oetA5km")
                    .youtubeVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")
                    .footerText("© 2026 Chiến Dịch Tiếp Sức Mùa Thi. Cùng sĩ tử vượt qua bước ngoặt thanh xuân.")
                    
                    // Letter Screen Defaults
                    .letterTitle("Thư Cảm Ơn Tập Thể")
                    .letterSubtitle("Ban Tổ Chức Chiến Dịch Tiếp Sức Mùa Thi 2026")
                    .letterDate("Hà Nội, ngày 15 tháng 07 năm 2026")
                    .letterContent1("Thân gửi tất cả các bạn tình nguyện viên, những \"người hùng thầm lặng\" của mùa hè rực rỡ năm nay. Khi những tiếng trống trường cuối cùng đã lắng lại và cánh cửa đại học đang dần mở ra cho hàng triệu thí sinh, chúng tôi - Ban Tổ Chức - mới thực sự có một khoảng lặng để viết những dòng tri ân sâu sắc nhất gửi đến các bạn.")
                    .letterContent2("Suốt chặng đường vừa qua, chúng ta đã cùng nhau vượt qua cái nóng oi ả của mùa hè, những cơn mưa rào bất chợt, và cả những áp lực vô hình từ trách nhiệm. Các bạn đã không quản ngại gian khó, có mặt tại mọi điểm trường từ sáng sớm tinh sương đến khi phố xá đã lên đèn.")
                    .letterContent3("Giá trị của các bạn không chỉ nằm ở những con số ấn tượng phía trên, mà còn ở nụ cười khích lệ dành cho những thí sinh đang lo lắng, ở sự chu đáo khi hướng dẫn phụ huynh chỗ nghỉ ngơi, hay cái nắm tay tiếp thêm động lực cho các sĩ tử bước vào phòng thi. Đó là những khoảnh khắc đẹp nhất của tuổi trẻ - một tuổi trẻ cống hiến và tràn đầy lòng nhân ái. Thay mặt Ban Tổ Chức và Trung ương Đoàn TNCS Hồ Chí Minh, tôi xin gửi lời cảm ơn chân thành và niềm tự hào lớn lao đến từng cá nhân đã góp phần làm nên thành công của \"Tiếp Sức Mùa Thi 2026\". Chúc các bạn luôn giữ vững ngọn lửa nhiệt huyết này trong mọi hành trình sắp tới của cuộc đời.")
                    .letterStat1Val("120K+")
                    .letterStat1Lbl("Thí sinh được hỗ trợ")
                    .letterStat2Val("500+")
                    .letterStat2Lbl("Điểm thi an toàn")
                    .letterStat3Val("1.5M")
                    .letterStat3Lbl("Bữa ăn & nước uống")
                    .letterSignature("https://lh3.googleusercontent.com/aida-public/AB6AXuAm4TGg2nwCSvz2tbfn6uTTZd96PpdwTv8kfW7zERoQkVTTtvjiof--MpYX2Uu0sOAeCmWXinNCVc3raF7meTFvpOZIEB2OvLBv0lNJ1iOaqUGKIDnn5rrNOTlwin0qO_AkMFdtwReeCXC5bfJt-7q0Kb_VRE-bDEymUb31qswEVdUvRpBybXd43xahXeHRHuLII3hAlmecYcCEaauTmfmpiT8yUWaUK39ERmFgcNOI1k2X2s1Z5Om4")
                    .letterSignerName("Nguyễn Minh Hoàng")
                    .letterSignerRole("Trưởng Ban Tổ Chức Chương Trình")
                    .letterSignerOrg("Trung ương Đoàn TNCS Hồ Chí Minh")
                    
                    // Closing Screen Defaults
                    .closingTitle("Lời Kết")
                    .closingSubtitle("Tạm biệt mùa hè Tiếp Sức Mùa Thi 2026")
                    .closingContent("Chiến dịch Tiếp Sức Mùa Thi 2026 khép lại nhưng tinh thần tình nguyện và những bài ca thanh xuân vẫn sẽ luôn rộn rã trong tim mỗi chúng ta. Cảm ơn vì đã cùng nhau làm nên một mùa hè đáng nhớ!")
                    .closingVolTarget(15000)
                    .closingStuTarget(1200000)
                    .closingDaysTarget(45)
                    .closingImage("https://lh3.googleusercontent.com/aida-public/AB6AXuCMfLiKiUQoAR-RlyIZXf_A7Iz8Mjz6dJld8zBiA_ZGjehag8d496N8xJQGgoj9nD1kZbjdpRcHLl435ewKc_5pz2BXHC8_FJqJ4HPllVCOa1TxfsBs7QRMFZS_5cVo03F816WQ38o-3QjScD5Uy7deQpZBN1R7_zmAtFwMqzS0KNO8Eg5RA2lA7jSAxJqZ8drFY1d99g2rurnD-JcW2TkYe-cW-lKBNBfCYyMrvgdrRzNVB2OiuO9W")
                    .build();
            setting = settingRepo.save(setting);
        }
        return ResponseEntity.ok(setting);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateSettings(@RequestBody SiteSetting updated) {
        SiteSetting existing = settingRepo.findAll().stream().findFirst().orElse(null);
        if (existing == null) {
            existing = new SiteSetting();
        }

        existing.setHeroTitle(updated.getHeroTitle());
        existing.setHeroSubtitle(updated.getHeroSubtitle());
        existing.setHeroBackground(updated.getHeroBackground());
        existing.setYoutubeVideoUrl(updated.getYoutubeVideoUrl());
        existing.setFooterText(updated.getFooterText());

        // Letter
        existing.setLetterTitle(updated.getLetterTitle());
        existing.setLetterSubtitle(updated.getLetterSubtitle());
        existing.setLetterDate(updated.getLetterDate());
        existing.setLetterContent1(updated.getLetterContent1());
        existing.setLetterContent2(updated.getLetterContent2());
        existing.setLetterContent3(updated.getLetterContent3());
        existing.setLetterStat1Val(updated.getLetterStat1Val());
        existing.setLetterStat1Lbl(updated.getLetterStat1Lbl());
        existing.setLetterStat2Val(updated.getLetterStat2Val());
        existing.setLetterStat2Lbl(updated.getLetterStat2Lbl());
        existing.setLetterStat3Val(updated.getLetterStat3Val());
        existing.setLetterStat3Lbl(updated.getLetterStat3Lbl());
        existing.setLetterSignature(updated.getLetterSignature());
        existing.setLetterSignerName(updated.getLetterSignerName());
        existing.setLetterSignerRole(updated.getLetterSignerRole());
        existing.setLetterSignerOrg(updated.getLetterSignerOrg());

        // Closing
        existing.setClosingTitle(updated.getClosingTitle());
        existing.setClosingSubtitle(updated.getClosingSubtitle());
        existing.setClosingContent(updated.getClosingContent());
        existing.setClosingVolTarget(updated.getClosingVolTarget());
        existing.setClosingStuTarget(updated.getClosingStuTarget());
        existing.setClosingDaysTarget(updated.getClosingDaysTarget());
        existing.setClosingImage(updated.getClosingImage());

        return ResponseEntity.ok(settingRepo.save(existing));
    }
}
