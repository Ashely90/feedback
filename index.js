$(function () {
	var Page = {
		init: function () {
			this.handlers();
		},

		handlers: function () {
			//点击提交按钮
			$("#saveBtn").on("click", function () {
				var ele = $("#saveBtn");
				if (ele.hasClass("disabled")) {
					return false;
				}
				ele.addClass("disabled");

				var name = $("#name").val().trim();
				var phone = $("#phone").val().trim();
				var email = $("#email").val().trim();
				var type = $("#type").val();
				var description = $("#description").val().trim();


				if (name.length === 0 || phone.length === 0 || email.length === 0 || type.length === 0 || description.length === 0) {
					$("#errText").html("所有的输入项都不能为空");
					$("#errTip").show();
					ele.removeClass("disabled");
					return false;
				}

				var params = {
					name: name,
					phone: phone,
					email: email,
					type: type,
					description: description,
				};

				//var host = "http://localhost:3000/api/v1";
				var host = "http://173.254.197.167:3000/api/v1";

				$.ajax({
					url: host + "/open/problem",
					type: "POST",
					data: params,
					success: function (sendData) {
						if (sendData && sendData.isAdd) {
							location.href = "success.html";
						}
						else {
							$("#errText").html('系统繁忙，稍后再试');
							$("#errTip").show();
						}

					},
					error: function (errData) {
						var errObj = JSON.parse(errData.responseText || '{}');
						if (errObj instanceof Array) {
							//validator检测错误，错误是数组，throw是对象
							errObj = errObj[0];
						}
						$("#errText").html(errObj.message || '系统繁忙，稍后再试');
						$("#errTip").show();
					},
					complete: function () {
						ele.removeClass("disabled");
					}
				});

			});

			$("input").on("click",function(){
				$("#errTip").hide();
			});

			//点击清除符号
			$(".ui-icon-close").on("click", function () {
				var id = this.getAttribute('name');
				$("#" + id).val("");

			});

		}

	};

	Page.init();


});